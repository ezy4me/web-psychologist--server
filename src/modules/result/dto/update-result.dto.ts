import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateResultDto {
  @ValidateIf((o) => o.text !== undefined)
  @IsString({ message: 'Answer text must be a string' })
  text: string;

  @ValidateIf((o) => o.minScore !== undefined)
  @IsNumber({}, { message: 'Result min score must be a number' })
  minScore: number;

  @ValidateIf((o) => o.maxScore !== undefined)
  @IsNumber({}, { message: 'Result max score must be a number' })
  maxScore: number;

  @ValidateIf((o) => o.testId !== undefined)
  @IsNumber({}, { message: 'Result testId must be a number' })
  testId: number;
}
