import { Injectable } from '@nestjs/common';
import { CreateInterviewQuestionDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInterviewQuestionDto: CreateInterviewQuestionDto) {
    const { details, ...questionData } = createInterviewQuestionDto;

    const newQuestion = await this.prisma.interviewQuestion.create({
      data: {
        ...questionData,
        details: details
          ? {
              create: {
                options: details.options || null,
                min: details.min || null,
                max: details.max || null,
                step: details.step || null,
              },
            }
          : undefined,
      },
    });

    return newQuestion;
  }

  async getAll() {
    const interviewSlots = await this.prisma.interviewQuestion.findMany({
      include: {
        details: true,
      },
    });
    return interviewSlots;
  }

  async getAnswersByQuestionId(questionId: string) {
    const answers = await this.prisma.interviewQuestionAnswer.findMany({
      where: { questionId },
    });
    return answers;
  }

  update(id: number, updateInterviewDto: UpdateInterviewDto) {
    return `This action updates a #${id} interview`;
  }
}
