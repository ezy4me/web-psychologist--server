import { IsPasswordMatchingConstraint } from '@common/decorators';
import {
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsString()
  @MinLength(5)
  @Validate(IsPasswordMatchingConstraint)
  passwordRepeat: string;

  @IsNumber()
  roleId: number;
}
