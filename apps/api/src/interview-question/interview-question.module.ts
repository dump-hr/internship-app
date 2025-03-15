import { Module } from '@nestjs/common';
import { InterviewQuestionService } from './interview-question.service';
import { InterviewQuestionController } from './interview-question.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InterviewQuestionController],
  providers: [InterviewQuestionService, PrismaService],
})
export class InterviewQuestionModule {}
