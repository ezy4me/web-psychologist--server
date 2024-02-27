// test-question.controller.ts
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TestQuestion } from '@prisma/client';
import { TestQuestionService } from './test-question.service';
import { TestQuestionDto } from './dto/test-question.dto';

@Controller('test-question')
export class TestQuestionController {
  constructor(private readonly testQuestionService: TestQuestionService) {}

  @Get()
  async findAll(): Promise<TestQuestion[]> {
    return this.testQuestionService.findAll();
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TestQuestion> {
    return this.testQuestionService.findOneById(id);
  }

  @Post()
  async create(@Body() dto: TestQuestionDto): Promise<TestQuestion> {
    return this.testQuestionService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TestQuestionDto,
  ): Promise<TestQuestion> {
    return this.testQuestionService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<TestQuestion> {
    return this.testQuestionService.delete(id);
  }
}
