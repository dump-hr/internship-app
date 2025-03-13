import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { PrismaService } from 'src/prisma.service';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [InterviewController],
  providers: [InterviewService, LoggerService, PrismaService],
})
export class InterviewModule {}
