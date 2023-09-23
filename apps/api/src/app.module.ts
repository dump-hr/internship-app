import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { InternModule } from './intern/intern.module';
import { InternDisciplineModule } from './intern-discipline/intern-discipline.module';
import { InterviewSlotModule } from './interview-slot/interview-slot.module';
import { PrismaService } from './prisma.service';
import { InterviewerController } from './interviewer/interviewer.controller';
import { InterviewerService } from './interviewer/interviewer.service';
import { InterviewerModule } from './interviewer/interviewer.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client', 'dist'),
      exclude: ['/api/(.*)'],
    }),
    InternModule,
    EmailModule,
    AuthModule,
    InterviewSlotModule,
    InternDisciplineModule,
    InterviewerModule,
  ],
  controllers: [AppController, AuthController, InterviewerController],
  providers: [AppService, PrismaService, InterviewerService],
})
export class AppModule {}
