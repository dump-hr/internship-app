import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { extname, join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { InternModule } from './intern/intern.module';
import { InternshipApplicationStatusModule } from './internship-application-status/internship-application-status.module';
import { QuestionModule } from './interview-question/interview-question.module';
import { InterviewSlotModule } from './interview-slot/interview-slot.module';
import { InterviewerModule } from './interviewer/interviewer.module';
import { LoggerModule } from './logger/logger.module';
import { OldInternResultModule } from './old-intern-result/old-intern-result.module';
import { PrismaService } from './prisma.service';
import { TestSlotModule } from './test-slot/test-slot.module';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', '..', '..', 'web', 'dist', 'assets'),
        serveRoot: '/assets', // available at https://yourdomain.com/assets/...
        exclude: ['/api/(.*)'], // API routes skip this
        serveStaticOptions: {
          setHeaders: (res, path) => {
            const ext = extname(path);
            if (ext === '.js') {
              res.setHeader('Content-Type', 'application/javascript');
            }
          },
        },
      },
      {
        rootPath: join(__dirname, '..', '..', '..', 'web', 'dist'),
        exclude: ['/api/(.*)', '/assets/(.*)'], // don’t override API or assets
      },
    ),
    LoggerModule,
    InternModule,
    EmailModule,
    AuthModule,
    InterviewSlotModule,
    InterviewerModule,
    TestSlotModule,
    InterviewerModule,
    QuestionModule,
    InternshipApplicationStatusModule,
    OldInternResultModule,
  ],
  controllers: [AppController /* , AuthController */],
  providers: [AppService, PrismaService],
})
export class AppModule {}
