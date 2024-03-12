import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { PsychologistService } from '@modules/psychologist/psychologist.service';
import { AnswerService } from '@modules/answer/answer.service';
import { QuestionService } from '@modules/question/question.service';
import { TestQuestionService } from '@modules/test-question/test-question.service';
import { ResultService } from '@modules/result/result.service';

@Module({
  controllers: [TestController],
  providers: [
    TestService,
    PsychologistService,
    AnswerService,
    QuestionService,
    TestQuestionService,
    ResultService,
  ],
})
export class TestModule {}
