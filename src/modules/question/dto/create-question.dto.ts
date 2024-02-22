import { IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString({ message: 'Question text must be a string' })
  text: string;
}
