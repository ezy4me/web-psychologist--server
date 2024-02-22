import { IsNumber, IsString } from 'class-validator';

export class CreatePsychologistDto {
  @IsString({ message: 'Education must be a string' })
  education: string;

  @IsString({ message: 'Qualification must be a string' })
  qualification: string;

  @IsString({ message: 'Experience must be a string' })
  experience: string;

  @IsNumber({}, { message: 'UserId must be a number' })
  userId: number;
}
