import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateProfileDto {
  @ValidateIf((o) => o.name !== undefined)
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ValidateIf((o) => o.phone !== undefined)
  @IsString({ message: 'Phone must be a string' })
  phone: string;

  @ValidateIf((o) => o.gender !== undefined)
  @IsString({ message: 'Gender must be a string' })
  gender: string;

  @ValidateIf((o) => o.birthday !== undefined)
  birthday: string;

  @ValidateIf((o) => o.description !== undefined)
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ValidateIf((o) => o.image !== undefined)
  @IsString({ message: 'Image must be a string' })
  image: string;

  @ValidateIf((o) => o.userId !== undefined)
  @IsNumber({}, { message: 'UserId must be a number' })
  userId: number;
}
