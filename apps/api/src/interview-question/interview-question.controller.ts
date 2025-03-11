import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { InterviewQuestionService } from './interview-question.service';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { QuestionAvailabilityRequest } from '@internship-app/types';

@Controller('interview-question')
export class InterviewQuestionController {
  constructor(
    private readonly interviewQuestionService: InterviewQuestionService,
  ) {}

  @Post()
  create(@Body() createInterviewQuestionDto: CreateInterviewQuestionDto) {
    const newInterviewQuestion = this.interviewQuestionService.create(
      createInterviewQuestionDto,
    );

    return newInterviewQuestion;
  }

  @Get()
  getAll() {
    const interviewQuestions = this.interviewQuestionService.getAll();

    return interviewQuestions;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewQuestionService.findOne(+id);
  }

  @Put('setAvailability/:questionId')
  async setAvailability(
    @Param('questionId') questionId: string,
    @Body() data: QuestionAvailabilityRequest,
  ) {
    return this.interviewQuestionService.setAvailability(questionId, data);
  }
}
