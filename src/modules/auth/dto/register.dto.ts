import { IsPasswordMatchingConstraint } from '@common/decorators';
import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  @Validate(IsPasswordMatchingConstraint)
  passwordRepeat: string;

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
