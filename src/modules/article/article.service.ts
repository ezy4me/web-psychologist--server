import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from '@prisma/client';
import { DatabaseService } from '@database/database.service';
import { CreateArticleDto, UpdateArticleDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Article[]> {
    return this.databaseService.article.findMany({
      include: {
        psychologist: {
          select: {
            user: {
              select: {
                profile: {
                  select: { name: true, image: true },
                },
              },
            },
          },
        },
      },
    });
  }

  async findOneById(id: number): Promise<Article> {
    const article = await this.databaseService.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

  async create(dto: CreateArticleDto): Promise<Article> {
    return this.databaseService.article.create({
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        description: dto.description,
        isApproved: dto.isApproved,
        image: dto.image,
        psychologistId: dto.psychologistId,
      },
    });
  }

  async update(id: number, dto: UpdateArticleDto): Promise<Article> {
    await this.findOneById(id);

    return this.databaseService.article.update({
      where: { id },
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        description: dto.description,
        isApproved: dto.isApproved,
        image: dto.image,
        psychologistId: dto.psychologistId,
      },
    });
  }

  async delete(id: number): Promise<Article> {
    await this.findOneById(id);

    return this.databaseService.article.delete({
      where: { id },
    });
  }
}
