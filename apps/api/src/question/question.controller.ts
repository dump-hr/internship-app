import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('interview-questions')
@ApiTags('interview-questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getAllQuestions() {
    return this.questionService.getAllInterviewQuestions();
  }

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createInterviewQuestion(createQuestionDto);
  }
}
