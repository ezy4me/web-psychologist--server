import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateAnswerDto {
  @ValidateIf((o) => o.text !== undefined)
  @IsString({ message: 'Answer text must be a string' })
  text: string;

  @ValidateIf((o) => o.score !== undefined)
  @IsNumber({}, { message: 'Answer score must be a number' })
  score: number;

  @ValidateIf((o) => o.questionId !== undefined)
  @IsNumber({}, { message: 'Answer questionId must be a number' })
  questionId: number;
}
