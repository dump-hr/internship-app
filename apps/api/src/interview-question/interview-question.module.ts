import { Module } from '@nestjs/common';
import { InterviewQuestionService } from './interview-question.service';
import { InterviewQuestionController } from './interview-question.controller';
import { PrismaService } from 'src/prisma.service';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [InterviewQuestionController],
  providers: [InterviewQuestionService, LoggerService, PrismaService],
})
export class InterviewQuestionModule {}
