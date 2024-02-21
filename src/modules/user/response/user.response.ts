import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class UserResponse implements User {
  id: number;

  @IsString()
  email: string;

  @Exclude()
  password: string;

  @IsNumber()
  roleId: number;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
