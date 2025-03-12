import { Injectable } from '@nestjs/common';
import { QuestionCategory, QuestionType } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllInterviewQuestions() {
    return await this.prisma.interviewQuestion.findMany();
  }

  async createInterviewQuestion(createQuestionDto: CreateQuestionDto) {
    const newQuestion = await this.prisma.interviewQuestion.create({
      data: createQuestionDto,
    });

    return newQuestion;
  }
}
