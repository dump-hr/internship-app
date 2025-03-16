import { Injectable } from '@nestjs/common';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { UpdateInterviewQuestionDto } from './dto/update-interview-question.dto';
import { PrismaService } from 'src/prisma.service';
import { QuestionCategory, QuestionType } from '@prisma/client';

@Injectable()
export class InterviewQuestionsService {
  constructor(private prisma: PrismaService) {}

  create(createInterviewQuestionDto: CreateInterviewQuestionDto) {
    return this.prisma.interviewQuestion.create({
      data: createInterviewQuestionDto,
    });
  }

  async findAll(query: {
    page: string;
    limit: string;
    type?: QuestionType;
    category?: QuestionCategory;
  }) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.type && { type: query.type }),
      ...(query.category && { category: query.category }),
    };

    const [data, total] = await Promise.all([
      this.prisma.interviewQuestion.findMany({
        where,
        skip,
        take: limit,
      }),
      this.prisma.interviewQuestion.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: string) {
    return this.prisma.interviewQuestion.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateInterviewQuestionDto: UpdateInterviewQuestionDto,
  ) {
    return this.prisma.interviewQuestion.update({
      where: { id },
      data: updateInterviewQuestionDto,
    });
  }

  async getQuestionAnswers(id: string) {
    return this.prisma.interviewQuestionAnswer.findMany({
      where: { questionId: id },
      include: {
        interviewSlot: {
          include: {
            intern: true,
          },
        },
      },
    });
  }

  async toggleAnswerFlag(id: string) {
    const answer = await this.prisma.interviewQuestionAnswer.findUnique({
      where: { id },
    });

    return this.prisma.interviewQuestionAnswer.update({
      where: { id },
      data: { flagged: !answer?.flagged },
    });
  }
}
