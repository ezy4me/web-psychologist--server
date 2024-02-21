import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  gender: string;

  birtday: Date;

  @IsPhoneNumber()
  phone: string;

  @IsNumber()
  roleId: number;
}
