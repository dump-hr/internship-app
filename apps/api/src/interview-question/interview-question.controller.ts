import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InterviewQuestionService } from './interview-question.service';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { UpdateInterviewQuestionDto } from './dto/update-interview-question.dto';

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterviewQuestionDto: UpdateInterviewQuestionDto,
  ) {
    return this.interviewQuestionService.update(
      +id,
      updateInterviewQuestionDto,
    );
  }
}
