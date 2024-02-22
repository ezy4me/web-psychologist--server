import { Injectable, NotFoundException } from '@nestjs/common';
import { Question } from '@prisma/client';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { DatabaseService } from '@database/database.service';

@Injectable()
export class QuestionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Question[]> {
    return this.databaseService.question.findMany();
  }

  async findOneById(id: number): Promise<Question> {
    const question = await this.databaseService.question.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  async create(dto: CreateQuestionDto): Promise<Question> {
    return this.databaseService.question.create({
      data: {
        text: dto.text,
      },
    });
  }

  async update(id: number, dto: UpdateQuestionDto): Promise<Question> {
    await this.findOneById(id);

    return this.databaseService.question.update({
      where: { id },
      data: {
        text: dto.text,
      },
    });
  }

  async delete(id: number): Promise<Question> {
    const question = await this.findOneById(id);
    await this.databaseService.question.delete({
      where: { id },
    });
    return question;
  }
}
