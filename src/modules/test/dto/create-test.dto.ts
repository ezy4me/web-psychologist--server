import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateResultDto } from '@modules/result/dto';

export class QuestionDto {
  @IsString({ message: 'Question must be a string' })
  question: string;

  @IsArray({ message: 'Options must be an array' })
  @IsString({ each: true, message: 'Each option must be a string' })
  options: string[];

  @IsArray({ message: 'Points must be an array' })
  @IsNumber({}, { each: true, message: 'Each point must be a number' })
  points: number[];
}

export class CreateTestDto {
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsString({ message: 'Subtitle must be a string' })
  subtitle: string;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsBoolean({ message: 'isApproved must be a boolean' })
  isApproved: boolean;

  @IsDateString({}, { message: 'CreatedAt must be a Date' })
  createdAt: Date;

  @IsString({ message: 'Image must be a string' })
  image: string;

  @ValidateIf((o) => o.userId !== undefined)
  @IsNumber({}, { message: 'UserId must be a number' })
  userId?: number;

  @ValidateIf((o) => o.psychologistId !== undefined)
  @IsNumber({}, { message: 'PsychologistId must be a number' })
  psychologistId?: number;

  @IsArray({ message: 'Questions must be an array' })
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @IsArray({ message: 'Questions must be an array' })
  @ValidateNested({ each: true })
  results: CreateResultDto[];
}
