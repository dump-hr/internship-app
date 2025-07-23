import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { QuestionController } from './interview-question.controller';
import { QuestionService } from './interview-question.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, PrismaService],
})
export class QuestionModule {}
