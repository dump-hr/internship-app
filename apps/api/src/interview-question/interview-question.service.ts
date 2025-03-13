import { Injectable } from '@nestjs/common';
import { InterviewQuestionDto } from './dto/interview-question.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async update(saveInterviewQuestionsDto: InterviewQuestionDto[]) {
    const updatedQuestions = Promise.all(
      saveInterviewQuestionsDto.map((dto) => {
        const { details, ...questionData } = dto;

        return this.prisma.interviewQuestion.upsert({
          where: { id: dto.id },
          update: {
            ...questionData,
            details: details
              ? {
                  upsert: {
                    update: {
                      options: details.options || null,
                      min: details.min || null,
                      max: details.max || null,
                      step: details.step || null,
                    },
                    create: {
                      options: details.options || null,
                      min: details.min || null,
                      max: details.max || null,
                      step: details.step || null,
                    },
                  },
                }
              : undefined,
          },
          create: {
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
      }),
    );
    return updatedQuestions;
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
      include: {
        internDiscipline: true,
      },
    });
    return answers;
  }
}
