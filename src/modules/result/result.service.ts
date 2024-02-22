import { Injectable, NotFoundException } from '@nestjs/common';
import { Result } from '@prisma/client';
import { CreateResultDto, UpdateResultDto } from './dto';
import { DatabaseService } from '@database/database.service';

@Injectable()
export class ResultService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Result[]> {
    return this.databaseService.result.findMany();
  }

  async findOneById(id: number): Promise<Result> {
    const result = await this.databaseService.result.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }

    return result;
  }

  async create(dto: CreateResultDto): Promise<Result> {
    return this.databaseService.result.create({
      data: {
        text: dto.text,
        minScore: dto.minScore,
        maxScore: dto.maxScore,
        testId: dto.testId,
      },
    });
  }

  async update(id: number, dto: UpdateResultDto): Promise<Result> {
    await this.findOneById(id);

    return this.databaseService.result.update({
      where: { id },
      data: {
        text: dto.text,
        minScore: dto.minScore,
        maxScore: dto.maxScore,
        testId: dto.testId,
      },
    });
  }

  async delete(id: number): Promise<Result> {
    const result = await this.findOneById(id);
    await this.databaseService.result.delete({
      where: { id },
    });
    return result;
  }
}
