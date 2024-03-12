import {
  IsBoolean,
  IsNumber,
  IsString,
  ValidateIf,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionDto } from './create-test.dto';
import { CreateResultDto } from '@modules/result/dto';

export class UpdateTestDto {
  @ValidateIf((o) => o.title !== undefined)
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ValidateIf((o) => o.subtitle !== undefined)
  @IsString({ message: 'Subtitle must be a string' })
  subtitle: string;

  @ValidateIf((o) => o.description !== undefined)
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ValidateIf((o) => o.isApproved !== undefined)
  @IsBoolean({ message: 'isApproved must be a boolean' })
  isApproved: boolean;

  @ValidateIf((o) => o.image !== undefined)
  @IsString({ message: 'Image must be a string' })
  image: string;

  @ValidateIf((o) => o.userId !== undefined)
  @IsNumber({}, { message: 'UserId must be a number' })
  userId?: number;

  @ValidateIf((o) => o.psychologistId !== undefined)
  @IsNumber({}, { message: 'PsychologistId must be a number' })
  psychologistId: number;

  @ValidateIf((o) => o.questions !== undefined)
  @IsArray({ message: 'Questions must be an array' })
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @ValidateIf((o) => o.results !== undefined)
  @IsArray({ message: 'Results must be an array' })
  @ValidateNested({ each: true })
  results: CreateResultDto[];
}
