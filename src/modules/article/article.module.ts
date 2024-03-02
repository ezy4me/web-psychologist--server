import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { PsychologistService } from '@modules/psychologist/psychologist.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, PsychologistService],
})
export class ArticleModule {}
