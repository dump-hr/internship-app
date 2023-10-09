import { Module } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

import { InterviewerController } from './interviewer.controller';
import { InterviewerService } from './interviewer.service';

@Module({
  controllers: [InterviewerController],
  providers: [InterviewerService, LoggerService, PrismaService],
})
export class InterviewerModule {}
