import { Injectable, NotFoundException } from '@nestjs/common';
import { Test } from '@prisma/client';
import { DatabaseService } from '@database/database.service';
import { CreateTestDto, UpdateTestDto } from './dto';

@Injectable()
export class TestService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Test[]> {
    return this.databaseService.test.findMany({
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

  async findOneById(id: number): Promise<Test> {
    const test = await this.databaseService.test.findUnique({
      where: { id },
    });

    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    return test;
  }

  async create(dto: CreateTestDto): Promise<Test> {
    return this.databaseService.test.create({
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

  async update(id: number, dto: UpdateTestDto): Promise<Test> {
    await this.findOneById(id);

    return this.databaseService.test.update({
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

  async delete(id: number): Promise<Test> {
    await this.findOneById(id);

    return this.databaseService.test.delete({
      where: { id },
    });
  }
}
