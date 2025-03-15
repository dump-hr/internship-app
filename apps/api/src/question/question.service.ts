import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { EditQuestionDto } from './dto/editQuestion.dto';
import { NotFoundError } from 'rxjs';

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

  async editInterviewQuestion(editQuestionDto: EditQuestionDto) {
    const question = await this.prisma.interviewQuestion.findUnique({
      where: { id: editQuestionDto.id },
    });

    if (!question) {
      throw new NotFoundException('Not founded question.');
    }

    return await this.prisma.interviewQuestion.update({
      where: { id: question.id },
      data: {
        question: editQuestionDto.question,
        options: editQuestionDto.options,
        isEnabled: editQuestionDto.isEnabled,
      },
    });
  }
}
