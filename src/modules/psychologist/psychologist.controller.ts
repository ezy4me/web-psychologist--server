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
import { Chat, Psychologist } from '@prisma/client';
import { Public } from '@common/decorators';

@Controller('psychologist')
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Public()
  @Get()
  async findAll(): Promise<Psychologist[]> {
    return this.psychologistService.findAll();
  }

  @Public()
  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Psychologist> {
    return this.psychologistService.findOneById(id);
  }

  @Get('/chat/:id')
  async findChats(@Param('id', ParseIntPipe) id: number): Promise<Chat[]> {
    return this.psychologistService.findChats(id);
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
