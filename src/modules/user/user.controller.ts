import {
  Body,
  Post,
  Get,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { UserResponse } from './response';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@modules/auth/interfaces';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.userService.save(dto);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAllUsers() {
    const users = await this.userService.findAll();
    const userResponses = users.map((user) => new UserResponse(user));
    return userResponses;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':email')
  async findOneUser(@Param('email') email: string) {
    const user = await this.userService.findOne(email);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    const deletedUser = await this.userService.delete(id, user);
    return new UserResponse(deletedUser);
  }
}
