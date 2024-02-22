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
import { Answer } from '@prisma/client';
import { AnswerService } from './answer.service';
import { CreateAnswerDto, UpdateAnswerDto } from './dto';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get()
  async findAll(): Promise<Answer[]> {
    return this.answerService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<Answer> {
    return this.answerService.findOneById(id);
  }

  @Post()
  async create(@Body() dto: CreateAnswerDto): Promise<Answer> {
    return this.answerService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAnswerDto,
  ): Promise<Answer> {
    return this.answerService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Answer> {
    return this.answerService.delete(id);
  }
}
