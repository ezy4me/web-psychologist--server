import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
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

  @IsNumber({}, { message: 'PsychologistId must be a number' })
  psychologistId: number;
}
