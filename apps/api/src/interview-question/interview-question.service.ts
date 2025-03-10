import { Injectable } from '@nestjs/common';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { UpdateInterviewQuestionDto } from './dto/update-interview-question.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createInterviewQuestionDto: CreateInterviewQuestionDto) {
    return 'This action adds a new interviewQuestion';
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
    });

    return interviewQuestions;
  }

  findOne(id: number) {
    return `This action returns a #${id} interviewQuestion`;
  }

  update(id: number, updateInterviewQuestionDto: UpdateInterviewQuestionDto) {
    return `This action updates a #${id} interviewQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} interviewQuestion`;
  }
}
