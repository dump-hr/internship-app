import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateInterviewQuestionDto } from './dto/createInterviewQuestion.dto';
import { QuestionService } from './interview-question.service';

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
    @Body() body: { disabled: boolean },
  ) {
    return await this.questionService.updateInterviewQuestion(
      id,
      body.disabled,
    );
  }
}
