import { IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString({ message: 'Answer text must be a string' })
  text: string;

  @IsNumber({}, { message: 'Answer score must be a number' })
  score: number;

  @IsNumber({}, { message: 'Answer questionId must be a number' })
  questionId: number;
}
