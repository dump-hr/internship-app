import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { EditQuestionDto } from './dto/editQuestion.dto';

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

  @Patch()
  async update(@Body() question: EditQuestionDto) {
    return await this.questionService.editInterviewQuestion(question);
  }
}
