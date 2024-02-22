import { Module } from '@nestjs/common';
import { TestQuestionController } from './test-question.controller';
import { TestQuestionService } from './test-question.service';

@Module({
  controllers: [TestQuestionController],
  providers: [TestQuestionService]
})
export class TestQuestionModule {}
