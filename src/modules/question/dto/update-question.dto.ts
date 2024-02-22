import { IsString, ValidateIf } from 'class-validator';

export class UpdateQuestionDto {
  @ValidateIf((o) => o.text !== undefined)
  @IsString({ message: 'Question text must be a string' })
  text: string;
}
