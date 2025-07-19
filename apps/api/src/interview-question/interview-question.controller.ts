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
import { QuestionService } from './interview-question.service';
import { CreateInterviewQuestionDto } from './dto/createInterviewQuestion.dto';

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
    data: CreateInterviewQuestionDto,
  ) {
    return await this.questionService.createInterviewQuestion(data);
  }

  @Patch('/question/:id')
  async updateInterviewQuestion(
    @Param('id') id: string,
    @Body() body: { question: string; disabled: boolean },
  ) {
    try {
      const updated = await this.questionService.updateInterviewQuestion(
        id,
        body,
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
