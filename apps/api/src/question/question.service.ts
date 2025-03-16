import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { EditQuestionDto } from './dto/editQuestion.dto';
import { InterviewSlotService } from 'src/interview-slot/interview-slot.service';
import { Answer } from '@internship-app/types';

@Injectable()
export class QuestionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly interviewSlotService: InterviewSlotService,
  ) {}

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

    const questionTextChanged = question.question !== editQuestionDto.question;

    const updatedQuestion = await this.prisma.interviewQuestion.update({
      where: { id: question.id },
      data: {
        question: editQuestionDto.question,
        options: editQuestionDto.options,
        isEnabled: editQuestionDto.isEnabled,
      },
    });

    if (questionTextChanged) {
      await this.interviewSlotService.updateQuestionTextInAnswers(
        question.id,
        editQuestionDto.question,
      );
    }

    return updatedQuestion;
  }

  async getAnswersByQuestionId(questionId: string) {
    const question = await this.prisma.interviewQuestion.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      throw new Error('Pitanje nije pronađeno');
    }

    const interviewSlots = await this.interviewSlotService.getAll();

    const answers: Answer[] = interviewSlots
      .filter((slot) => slot.answers && Array.isArray(slot.answers))
      .map((slot) => {
        const answersArray = slot.answers as any[];
        const answerItem = answersArray.find((item) => item.id === questionId);

        if (answerItem) {
          return {
            internId: slot.internId,
            internName: slot.intern
              ? `${slot.intern.firstName} ${slot.intern.lastName}`
              : 'Nepoznato',
            question: question.question,
            questionId: question.id,
            answer: answerItem.value,
            tick: answerItem.tick ?? false,
            interviewDate: slot.start,
          };
        }
        return null;
      })
      .filter((item: Answer) => item !== null);

    return answers;
  }
}
