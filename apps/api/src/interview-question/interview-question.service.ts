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
    const interviewQuestions = await this.prisma.interviewQuestion.findMany({
      include: {
        details: true,
      },
    });
    const interviewQuestionDtos =
      this.getDtosFromInterviewQuestionList(interviewQuestions);
    return interviewQuestionDtos;
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

  private getDtosFromInterviewQuestionList(
    interviewQuestions: InterviewQuestionDto[],
  ) {
    const interviewQuestionDtos: InterviewQuestionDto[] =
      interviewQuestions.map((q) => {
        return {
          id: q.id,
          category: q.category,
          type: q.type,
          question: q.question,
          isEnabled: q.isEnabled,
          discipline: q.discipline,
          details: {
            options: q.details?.options ? JSON.parse(q.details?.options) : null,
            min: q.details?.min,
            max: q.details?.max,
            step: q.details?.step,
          },
        };
      });

    return interviewQuestionDtos;
  }
}
