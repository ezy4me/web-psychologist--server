import { IsPasswordMatchingConstraint } from '@common/decorators';
import { Profile } from '@prisma/client';
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

export class PsychologistRegisterDto {
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

  @IsString()
  education: string;

  @IsString()
  qualification: string;

  @IsString()
  experience: string;

  profile: Partial<Profile>;
}
