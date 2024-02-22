import { IsNumber, IsString } from 'class-validator';

export class CreateResultDto {
  @IsString({ message: 'Result text must be a string' })
  text: string;

  @IsNumber({}, { message: 'Result min score must be a number' })
  minScore: number;

  @IsNumber({}, { message: 'Result max score must be a number' })
  maxScore: number;

  @IsNumber({}, { message: 'Result testId must be a number' })
  testId: number;
}
