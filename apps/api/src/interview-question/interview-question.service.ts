import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { UpdateInterviewQuestionDto } from './dto/update-interview-question.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInterviewQuestionDto) {
    const newQuestion = await this.prisma.interviewQuestion.create({
      data: {
        title: dto.title.trim(),
        type: dto.type,
        category: dto.category,
        min: dto.min ?? null,
        max: dto.max ?? null,
        step: dto.step ?? null,
        options: dto.options ?? [],
        isActive: dto.isActive ?? true,
      },
    });

    return newQuestion;
  }

  async findAll() {
    const questions = await this.prisma.interviewQuestion.findMany();
    return questions;
  }

  async findOne(id: string) {
    const question = await this.prisma.interviewQuestion.findUnique({
      where: { id },
    });
    return question;
  }

  async update(id: string, dto: UpdateInterviewQuestionDto) {
    return await this.prisma.interviewQuestion.update({
      where: { id },
      data: {
        ...dto,
        min: dto.min ?? null,
        max: dto.max ?? null,
        step: dto.step ?? null,
        options: dto.options && dto.options.length === 0 ? [] : dto.options,
      },
    });
  }

  async toggleIsActive(id: string) {
    const question = await this.prisma.interviewQuestion.findUnique({
      where: { id },
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return await this.prisma.interviewQuestion.update({
      where: { id },
      data: { isActive: !question.isActive },
    });
  }

  async getQuestionAnswers(questionId: string) {
    return await this.prisma.interviewQuestionAnswer.findMany({
      where: { questionId },
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
    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    return await this.prisma.interviewQuestionAnswer.update({
      where: { id },
      data: { flagged: !answer.flagged },
    });
  }
}
