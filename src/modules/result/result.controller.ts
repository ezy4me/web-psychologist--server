import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Result } from '@prisma/client';
import { ResultService } from './result.service';
import { CreateResultDto, UpdateResultDto } from './dto';
import { Public } from '@common/decorators';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get()
  async findAll(): Promise<Result[]> {
    return this.resultService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<Result> {
    return this.resultService.findOneById(id);
  }

  @Public()
  @Get('test/:testId')
  async findOneByTestId(
    @Param('testId', ParseIntPipe) testId: number,
    @Query('score', ParseIntPipe) score?: number,
  ): Promise<Result> {
    return this.resultService.findOneByTestId(testId, score);
  }

  @Post()
  async create(@Body() dto: CreateResultDto): Promise<Result> {
    return this.resultService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateResultDto,
  ): Promise<Result> {
    return this.resultService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Result> {
    return this.resultService.delete(id);
  }
}
