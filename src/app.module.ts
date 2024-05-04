import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { PsychologistModule } from './modules/psychologist/psychologist.module';
import { DatabaseModule } from './database/database.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { DatabaseService } from '@database/database.service';
import { TestModule } from './modules/test/test.module';
import { AnswerModule } from './modules/answer/answer.module';
import { QuestionModule } from './modules/question/question.module';
import { TestQuestionModule } from './modules/test-question/test-question.module';
import { ResultModule } from './modules/result/result.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    ArticleModule,
    PsychologistModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static/images',
    }),
    TestModule,
    AnswerModule,
    QuestionModule,
    TestQuestionModule,
    ResultModule,
    ProfileModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
