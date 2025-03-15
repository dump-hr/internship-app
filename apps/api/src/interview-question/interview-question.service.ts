import { Injectable } from '@nestjs/common';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { UpdateInterviewQuestionDto } from './dto/update-interview-question.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInterviewQuestionDto: CreateInterviewQuestionDto) {
    const newQuestion = await this.prisma.interviewQuestion.create({
      data: createInterviewQuestionDto,
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

  async update(
    id: string,
    updateInterviewQuestionDto: UpdateInterviewQuestionDto,
  ) {
    return await this.prisma.interviewQuestion.update({
      where: { id },
      data: updateInterviewQuestionDto,
    });
  }
}
