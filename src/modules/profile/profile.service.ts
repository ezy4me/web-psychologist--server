import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { DatabaseService } from '@database/database.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Profile[]> {
    return this.databaseService.profile.findMany();
  }

  async findOneById(id: number): Promise<Profile> {
    const profile = await this.databaseService.profile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return profile;
  }

  async create(dto: CreateProfileDto): Promise<Profile> {
    return this.databaseService.profile.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        gender: dto.gender,
        birthday: dto.birthday,
        description: dto.description,
        image: dto.image,
        userId: dto.userId,
      },
    });
  }

  async update(id: number, dto: UpdateProfileDto): Promise<Profile> {
    await this.findOneById(id);

    return this.databaseService.profile.update({
      where: { id },
      data: {
        name: dto.name,
        phone: dto.phone,
        gender: dto.gender,
        birthday: dto.birthday,
        description: dto.description,
        image: dto.image,
        userId: dto.userId,
      },
    });
  }

  async delete(id: number): Promise<Profile> {
    await this.findOneById(id);

    return this.databaseService.profile.delete({
      where: { id },
    });
  }

  async findByUserId(userId: number): Promise<Profile> {
    return this.databaseService.profile.findFirst({ where: { userId } });
  }
}
