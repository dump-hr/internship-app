import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { InternModule } from './intern/intern.module';
import { InterviewMemberParticipationController } from './interview-member-participation/interview-member-participation.controller';
import { InterviewMemberParticipationModule } from './interview-member-participation/interview-member-participation.module';
import { InterviewMemberParticipationService } from './interview-member-participation/interview-member-participation.service';
import { InterviewSlotModule } from './interview-slot/interview-slot.module';
import { InterviewerController } from './interviewer/interviewer.controller';
import { InterviewerModule } from './interviewer/interviewer.module';
import { InterviewerService } from './interviewer/interviewer.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'web', 'dist'),
      exclude: ['/api/(.*)'],
    }),
    InternModule,
    EmailModule,
    AuthModule,
    InterviewSlotModule,
    InterviewerModule,
    InterviewMemberParticipationModule,
  ],
  controllers: [
    AppController,
    AuthController,
    InterviewerController,
    InterviewMemberParticipationController,
  ],
  providers: [
    AppService,
    PrismaService,
    InterviewerService,
    InterviewMemberParticipationService,
  ],
})
export class AppModule {}
