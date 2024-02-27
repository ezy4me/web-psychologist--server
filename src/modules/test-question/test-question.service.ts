import { Injectable, NotFoundException } from '@nestjs/common';
import { TestQuestion } from '@prisma/client';
import { DatabaseService } from '@database/database.service';
import { TestQuestionDto } from './dto/test-question.dto';

@Injectable()
export class TestQuestionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<TestQuestion[]> {
    return this.databaseService.testQuestion.findMany();
  }

  async findAllByTestId(testId: number): Promise<TestQuestion[]> {
    const questions = await this.databaseService.testQuestion.findMany({
      where: { testId },
      include: {
        test: { select: { title: true } },
        question: {
          include: {
            Answer: true,
          },
        },
      },
    });

    if (!questions) {
      throw new NotFoundException(`Test questions with ID ${testId} not found`);
    }

    return questions;
  }

  async findOneById(id: number): Promise<TestQuestion> {
    const question = await this.databaseService.testQuestion.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  async create(dto: TestQuestionDto): Promise<TestQuestion> {
    return this.databaseService.testQuestion.create({
      data: {
        testId: dto.testId,
        questionId: dto.questionId,
      },
    });
  }

  async update(id: number, dto: TestQuestionDto): Promise<TestQuestion> {
    await this.findOneById(id);

    return this.databaseService.testQuestion.update({
      where: { id },
      data: {
        testId: dto.testId,
        questionId: dto.questionId,
      },
    });
  }

  async delete(id: number): Promise<TestQuestion> {
    await this.findOneById(id);

    return this.databaseService.testQuestion.delete({
      where: { id },
    });
  }
}
