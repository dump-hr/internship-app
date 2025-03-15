import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
      type: QuestionType;
      category: QuestionCategory;
      minValue?: number | null;
      maxValue?: number;
      stepValue?: number;
    },
  ) {
    return await this.questionService.createInterviewQuestion(data);
  }

  @Patch('/question/:id')
  async updateInterviewQuestion(
    @Param('id') id: string,
    @Body() body: { question: string },
  ) {
    try {
      const updated = await this.questionService.updateInterviewQuestion(
        id,
        body.question,
      );

      return updated;
    } catch (error) {
      console.error('Failed to update DB:', error.message);
      throw new InternalServerErrorException(
        'Failed to update interview question',
        error.message,
      );
    }
  }
}
