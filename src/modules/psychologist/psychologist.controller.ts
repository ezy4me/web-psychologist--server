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

@Controller('psychologist')
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Get()
  async findAll() {
    return this.psychologistService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.psychologistService.findOneById(id);
  }

  @Post()
  async create(@Body() dto: CreatePsychologistDto) {
    return this.psychologistService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePsychologistDto,
  ) {
    return this.psychologistService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.psychologistService.delete(id);
  }
}
