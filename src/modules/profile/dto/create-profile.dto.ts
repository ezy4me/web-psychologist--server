import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'Phone must be a string' })
  phone: string;

  @IsString({ message: 'Gender must be a string' })
  gender: string;

  @IsDateString({}, { message: 'Birthday must be a Date' })
  birthday: string;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsString({ message: 'Image must be a string' })
  image: string;

  @IsNumber({}, { message: 'UserId must be a number' })
  userId: number;
}
