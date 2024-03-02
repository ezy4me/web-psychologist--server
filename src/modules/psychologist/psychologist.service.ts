import { Injectable, NotFoundException } from '@nestjs/common';
import { Psychologist } from '@prisma/client';
import { DatabaseService } from '@database/database.service';
import { CreatePsychologistDto, UpdatePsychologistDto } from './dto';

@Injectable()
export class PsychologistService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Psychologist[]> {
    return this.databaseService.psychologist.findMany({
      include: {
        user: {
          select: {
            email: true,
            profile: {
              select: {
                name: true,
                phone: true,
                gender: true,
                birthday: true,
                image: true,
              },
            },
          },
        },
      },
    });
  }

  async findOneById(id: number): Promise<Psychologist> {
    const psychologist = await this.databaseService.psychologist.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
            profile: {
              select: {
                name: true,
                phone: true,
                gender: true,
                birthday: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!psychologist) {
      throw new NotFoundException(`Psychologist with ID ${id} not found`);
    }

    return psychologist;
  }

  async findOneByUserId(id: number): Promise<Psychologist> {
    const psychologist = await this.databaseService.psychologist.findUnique({
      where: { userId: id },
    });

    if (!psychologist) {
      throw new NotFoundException(`Psychologist with ID ${id} not found`);
    }

    return psychologist;
  }

  async create(dto: CreatePsychologistDto): Promise<Psychologist> {
    return this.databaseService.psychologist.create({
      data: {
        education: dto.education,
        qualification: dto.qualification,
        experience: dto.experience,
        userId: dto.userId,
      },
    });
  }

  async update(id: number, dto: UpdatePsychologistDto): Promise<Psychologist> {
    await this.findOneById(id);

    return this.databaseService.psychologist.update({
      where: { id },
      data: {
        education: dto.education,
        qualification: dto.qualification,
        experience: dto.experience,
        userId: dto.userId,
      },
    });
  }

  async delete(id: number): Promise<Psychologist> {
    await this.findOneById(id);

    return this.databaseService.psychologist.delete({
      where: { id },
    });
  }
}
