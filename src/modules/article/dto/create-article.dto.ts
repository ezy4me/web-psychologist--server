import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateArticleDto {
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsString({ message: 'Subtitle must be a string' })
  subtitle: string;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsBoolean({ message: 'isApproved must be a boolean' })
  isApproved?: boolean;

  @IsDateString({}, { message: 'CreatedAt must be a Date' })
  createdAt?: Date;

  @IsString({ message: 'Image must be a string' })
  image: string;

  @ValidateIf((o) => o.psychologistId !== undefined)
  @IsNumber({}, { message: 'PsychologistId must be a number' })
  psychologistId?: number;

  @ValidateIf((o) => o.userId !== undefined)
  @IsNumber({}, { message: 'UserId must be a number' })
  userId?: number;
}
