import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PsychologistService } from './psychologist.service';
import { CreatePsychologistDto, UpdatePsychologistDto } from './dto';
import { Psychologist } from '@prisma/client';

@Controller('psychologist')
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Get()
  async findAll(): Promise<Psychologist[]> {
    return this.psychologistService.findAll();
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Psychologist> {
    return this.psychologistService.findOneById(id);
  }

  @Post()
  async create(@Body() dto: CreatePsychologistDto): Promise<Psychologist> {
    return this.psychologistService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePsychologistDto,
  ): Promise<Psychologist> {
    return this.psychologistService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Psychologist> {
    return this.psychologistService.delete(id);
  }
}
