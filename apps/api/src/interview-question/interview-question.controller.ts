import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InterviewQuestionService } from './interview-question.service';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { UpdateInterviewQuestionDto } from './dto/update-interview-question.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('interview-question')
@ApiTags('interview-questions')
export class InterviewQuestionController {
  constructor(
    private readonly interviewQuestionService: InterviewQuestionService,
  ) {}

  @Post()
  async create(@Body() createInterviewQuestionDto: CreateInterviewQuestionDto) {
    const newQuestion = await this.interviewQuestionService.create(
      createInterviewQuestionDto,
    );
    return newQuestion;
  }

  @Get()
  async findAll() {
    const questions = await this.interviewQuestionService.findAll();
    return questions;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const question = await this.interviewQuestionService.findOne(id);
    return question;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInterviewQuestionDto: UpdateInterviewQuestionDto,
  ) {
    return await this.interviewQuestionService.update(
      id,
      updateInterviewQuestionDto,
    );
  }

  @Patch(':id/toggle')
toggleIsActive(@Param('id') id: string) {
  return this.interviewQuestionService.toggleIsActive(id);
}
}
