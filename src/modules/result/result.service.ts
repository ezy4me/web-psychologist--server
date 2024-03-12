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

  async findOneByTestId(
    testId: number,
    score?: number,
  ): Promise<Result | null> {
    try {
      const results = await this.databaseService.result.findMany({
        where: { testId },
      });

      const result = results.find(
        (r) => score >= r.minScore && score <= r.maxScore,
      );

      return result || null;
    } catch (error) {
      console.error('Ошибка при поиске результата:', error);
      return null;
    }
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

  async createMany(dto: CreateResultDto[]): Promise<Result[]> {
    const results: Result[] = [];

    for (const item of dto) {
      const result = await this.databaseService.result.create({
        data: {
          text: item.text,
          minScore: item.minScore,
          maxScore: item.maxScore,
          testId: item.testId,
        },
      });
      results.push(result);
    }

    return results;
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

  async deleteByTestId(testId: number): Promise<void> {
    await this.databaseService.result.deleteMany({
      where: {
        testId: testId,
      },
    });
  }
}
