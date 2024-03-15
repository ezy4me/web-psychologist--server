import { Injectable, NotFoundException } from '@nestjs/common';
import { Test } from '@prisma/client';
import { DatabaseService } from '@database/database.service';
import { CreateTestDto, UpdateTestDto } from './dto';
import { PsychologistService } from '@modules/psychologist/psychologist.service';
import { AnswerService } from '@modules/answer/answer.service';
import { QuestionService } from '@modules/question/question.service';
import { TestQuestionService } from '@modules/test-question/test-question.service';
import { ResultService } from '@modules/result/result.service';

@Injectable()
export class TestService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly psychologistService: PsychologistService,
    private readonly answerService: AnswerService,
    private readonly questionService: QuestionService,
    private readonly testQuestionService: TestQuestionService,
    private readonly resultService: ResultService,
  ) {}

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

    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    return test;
  }

  async findOneByIdAllData(id: number): Promise<Test> {
    const test = await this.databaseService.test.findUnique({
      where: { id },
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
        TestQuestion: {
          select: {
            question: {
              include: { Answer: true },
            },
          },
        },
        Result: true,
      },
    });

    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    return test;
  }

  async findAllByUserId(id: number): Promise<Test[]> {
    const psychologist = await this.psychologistService.findOneByUserId(id);

    const test = await this.databaseService.test.findMany({
      where: { psychologistId: psychologist.id },
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

    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    return test;
  }

  async create(dto: CreateTestDto): Promise<Test> {
    console.log(dto);

    let psychologistId = dto.psychologistId;
    if (dto.userId) {
      const psychologist = await this.databaseService.psychologist.findUnique({
        where: { userId: dto.userId },
      });

      psychologistId = psychologist.id;
    }

    const test = await this.databaseService.test.create({
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        description: dto.description,
        isApproved: false,
        image: dto.image,
        psychologistId: psychologistId,
      },
    });

    for (const questionData of dto.questions) {
      const newQuestion = await this.databaseService.question.create({
        data: {
          text: questionData.question,
        },
      });

      for (let i = 0; i < questionData.options.length; i++) {
        await this.databaseService.answer.create({
          data: {
            text: questionData.options[i],
            score: questionData.points[i],
            questionId: newQuestion.id,
          },
        });
      }

      await this.testQuestionService.create({
        testId: test.id,
        questionId: newQuestion.id,
      });
    }

    await this.resultService.createMany(
      dto.results.map((result) => ({
        text: result.text,
        minScore: result.minScore,
        maxScore: result.maxScore,
        testId: test.id,
      })),
    );

    return test;
  }

  async update(id: number, dto: UpdateTestDto): Promise<Test> {
    const existingTest = await this.findOneByIdAllData(id);

    if (!existingTest) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    const updatedTest = await this.databaseService.test.update({
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

    if (dto.questions) {
      await this.testQuestionService.deleteByTestId(id);

      for (const questionData of dto.questions) {
        const newQuestion = await this.databaseService.question.create({
          data: {
            text: questionData.question,
          },
        });

        for (let i = 0; i < questionData.options.length; i++) {
          await this.databaseService.answer.create({
            data: {
              text: questionData.options[i],
              score: questionData.points[i],
              questionId: newQuestion.id,
            },
          });
        }

        await this.testQuestionService.create({
          testId: updatedTest.id,
          questionId: newQuestion.id,
        });
      }
    }

    if (dto.results) {
      await this.resultService.deleteByTestId(id);

      await this.resultService.createMany(
        dto.results.map((result) => ({
          text: result.text,
          minScore: result.minScore,
          maxScore: result.maxScore,
          testId: updatedTest.id,
        })),
      );
    }

    return updatedTest;
  }

  async delete(id: number): Promise<Test> {
    await this.findOneById(id);

    return this.databaseService.test.delete({
      where: { id },
    });
  }
}
