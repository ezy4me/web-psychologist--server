import { IsNumber } from 'class-validator';

export class TestQuestionDto {
  @IsNumber({}, { message: 'TestId must be a number' })
  testId: number;

  @IsNumber({}, { message: 'QuestionId must be a number' })
  questionId: number;
}
