import { IsBoolean, IsNumber, IsString, ValidateIf } from 'class-validator';

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

  @ValidateIf((o) => o.psychologistId !== undefined)
  @IsNumber({}, { message: 'PsychologistId must be a number' })
  psychologistId: number;
}
