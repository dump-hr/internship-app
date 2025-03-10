import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionCategory, QuestionType } from '@prisma/client';

import { QuestionService } from './question.service';

@Controller('interview-questions')
@ApiTags('interview-questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getAllInterviewQuestions() {
    return this.questionService.getAllInterviewQuestions();
  }

  @Post()
  async createInterviewQuestion(
    @Body()
    data: {
      question: string;
      questionType: QuestionType;
      questionCategory: QuestionCategory;
      minValue?: number | null;
      maxValue?: number;
      stepValue?: number;
    },
  ) {
    return await this.questionService.createInterviewQuestion(data);
  }
}
