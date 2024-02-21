import { Module } from '@nestjs/common';
import { PsychologistController } from './psychologist.controller';
import { PsychologistService } from './psychologist.service';

@Module({
  controllers: [PsychologistController],
  providers: [PsychologistService]
})
export class PsychologistModule {}
