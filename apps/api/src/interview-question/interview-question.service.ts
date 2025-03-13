import { Injectable } from '@nestjs/common';
import { InterviewQuestionDto } from './dto/interview-question.dto';
import { PrismaService } from 'src/prisma.service';
import { InterviewQuestion } from '@prisma/client';

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

  private getDtosFromInterviewQuestionList(
    interviewQuestions: InterviewQuestion[],
  ) {
    const interviewQuestionDtos: InterviewQuestionDto[] =
      interviewQuestions.map((q) => {
        return {
          id: q.id,
          category: q.category,
          type: q.type,
          question: q.question,
        };
      });

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
}
