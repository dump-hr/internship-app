import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateInterviewQuestionDto } from './dto/createInterviewQuestion.dto';
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

  async createInterviewQuestion(data: CreateInterviewQuestionDto) {
    try {
      return await this.prisma.interviewQuestion.create({
        data: {
          question: data.question,
          type: data.type,
          category: data.category,
          minValue: data.minValue,
          maxValue: data.maxValue,
          stepValue: data.stepValue,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create interview question',
        error.message,
      );
    }
  }
}
