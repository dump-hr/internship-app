import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { InterviewerController } from './interviewer.controller';
import { InterviewerService } from './interviewer.service';

@Module({
  controllers: [InterviewerController],
  providers: [InterviewerService, PrismaService],
})
export class InterviewerModule {}
