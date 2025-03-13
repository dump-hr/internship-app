import { Module } from '@nestjs/common';
import { InterviewQuestionsService } from './interview-questions.service';
import { InterviewQuestionsController } from './interview-questions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InterviewQuestionsController],
  providers: [InterviewQuestionsService, PrismaService],
  exports: [InterviewQuestionsService],
})
export class InterviewQuestionsModule {}
