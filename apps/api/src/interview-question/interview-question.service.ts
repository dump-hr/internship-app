import { Injectable } from '@nestjs/common';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { PrismaService } from 'src/prisma.service';
import {
  QuestionAvailabilityRequest,
  SetInterviewQuestionRequest,
} from '@internship-app/types';

@Injectable()
export class InterviewQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInterviewQuestionDto: CreateInterviewQuestionDto) {
    const newInterviewQuestion = await this.prisma.interviewQuestion.create({
      data: createInterviewQuestionDto,
    });

    return newInterviewQuestion;
  }

  async getAll() {
    const interviewQuestions = await this.prisma.interviewQuestion.findMany({
      orderBy: [
        {
          category: 'asc',
        },
        {
          createdAt: 'asc',
        },
      ],
      select: {
        id: true,
        title: true,
        type: true,
        category: true,
        min: true,
        max: true,
        step: true,
        options: true,
        isEnabled: true,
      },
    });

    return interviewQuestions;
  }

  async setAvailability(questionId: string, data: QuestionAvailabilityRequest) {
    const availability = await this.prisma.interviewQuestion.update({
      where: {
        id: questionId,
      },
      data: {
        isEnabled: data.isEnabled,
      },
    });
    return availability;
  }

  async setInterviewQuestion(
    questionId: string,
    data: SetInterviewQuestionRequest,
  ) {
    const interviewQuestion = await this.prisma.interviewQuestion.update({
      where: {
        id: questionId,
      },
      data: {
        title: data.title,
        type: data.type,
        category: data.category,
        min: data.min,
        max: data.max,
        step: data.step,
        options: data.options,
      },
    });
    return interviewQuestion;
  }
}
