import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrismaService } from '../prisma.service';
import { InterviewSlotService } from 'src/interview-slot/interview-slot.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, PrismaService, InterviewSlotService],
})
export class QuestionModule {}
