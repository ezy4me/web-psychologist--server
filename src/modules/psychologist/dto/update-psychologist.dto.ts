import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdatePsychologistDto {
  @ValidateIf((o) => o.education !== undefined)
  @IsString({ message: 'Education must be a string' })
  education: string;

  @ValidateIf((o) => o.qualification !== undefined)
  @IsString({ message: 'Qualification must be a string' })
  qualification: string;

  @ValidateIf((o) => o.experience !== undefined)
  @IsString({ message: 'Experience must be a string' })
  experience: string;

  @ValidateIf((o) => o.userId !== undefined)
  @IsNumber({}, { message: 'UserId must be a number' })
  userId: number;
}
