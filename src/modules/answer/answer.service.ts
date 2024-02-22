import { Injectable, NotFoundException } from '@nestjs/common';
import { Answer } from '@prisma/client';
import { CreateAnswerDto, UpdateAnswerDto } from './dto';
import { DatabaseService } from '@database/database.service';

@Injectable()
export class AnswerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Answer[]> {
    return this.databaseService.answer.findMany();
  }

  async findOneById(id: number): Promise<Answer> {
    const answer = await this.databaseService.answer.findUnique({
      where: { id },
    });

    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }

    return answer;
  }

  async create(dto: CreateAnswerDto): Promise<Answer> {
    return this.databaseService.answer.create({
      data: {
        text: dto.text,
        score: dto.score,
        questionId: dto.questionId,
      },
    });
  }

  async update(id: number, dto: UpdateAnswerDto): Promise<Answer> {
    await this.findOneById(id);

    return this.databaseService.answer.update({
      where: { id },
      data: {
        text: dto.text,
        score: dto.score,
      },
    });
  }

  async delete(id: number): Promise<Answer> {
    const answer = await this.findOneById(id);
    await this.databaseService.answer.delete({
      where: { id },
    });
    return answer;
  }
}
