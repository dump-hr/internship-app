import { Injectable } from '@nestjs/common';
import { QuestionCategory, QuestionType } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllInterviewQuestions() {
    try {
      return this.prisma.interviewQuestion.findMany();
    } catch (error) {
      throw new Error(`Error in getAllInterviewQuestions: ${error.message}`);
    }
  }

  async createInterviewQuestion(data: {
    question: string;
    questionType: QuestionType;
    questionCategory: QuestionCategory;
    minValue?: number | null;
    maxValue?: number | null;
    stepValue?: number | null;
  }) {
    return this.prisma.interviewQuestion.create({
      data: {
        question: data.question,
        questionType: data.questionType,
        questionCategory: data.questionCategory,
        // minValue: data.minValue ?? null,
        // maxValue: data.maxValue ?? null,
        // stepValue: data.stepValue ?? null,
      },
    });
  }
}
