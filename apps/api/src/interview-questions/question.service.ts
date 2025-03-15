import { Injectable, InternalServerErrorException } from '@nestjs/common';

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
          options: data.options,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create interview question',
        error.message,
      );
    }
  }

  async updateInterviewQuestion(id: string, data: string) {
    try {
      const updated = await this.prisma.interviewQuestion.update({
        where: { id: id },
        data: { question: data },
      });

      return updated;
    } catch (error) {
      console.error(' Interview question update failed:', error.message);
      throw new InternalServerErrorException(
        'Failed to update interview question',
        error.message,
      );
    }
  }
}
