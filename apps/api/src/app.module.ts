import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { InternModule } from './intern/intern.module';
import { InterviewMemberParticipationModule } from './interview-member-participation/interview-member-participation.module';
import { InterviewSlotModule } from './interview-slot/interview-slot.module';
import { InterviewerModule } from './interviewer/interviewer.module';
import { PrismaService } from './prisma.service';
import { TestSlotModule } from './test-slot/test-slot.module';

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
    TestSlotModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
