import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto, UpdateTestDto } from './dto';
import { Test } from '@prisma/client';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async findAll(): Promise<Test[]> {
    return this.testService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<Test> {
    return this.testService.findOneById(id);
  }

  @Post()
  async create(@Body() dto: CreateTestDto): Promise<Test> {
    return this.testService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTestDto,
  ): Promise<Test> {
    return this.testService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Test> {
    return this.testService.delete(id);
  }
}
