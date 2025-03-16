import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InterviewQuestionService } from './interview-question.service';
import { InterviewQuestionDto } from './dto/interview-question.dto';
import { AdminLogAction } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';

@Controller('interview/questions')
export class InterviewQuestionController {
  constructor(
    private readonly InterviewQuestionService: InterviewQuestionService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post('save')
  async update(@Body() InterviewQuestionDtos: InterviewQuestionDto[]) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Create,
      `Updateanje pitanja`,
    );

    const updatedQuestions = await this.InterviewQuestionService.update(
      InterviewQuestionDtos,
    );
    return updatedQuestions;
  }

  @Get()
  async getAll() {
    return await this.InterviewQuestionService.getAll();
  }

  @Get(':questionId')
  async get(@Param('questionId') questionId: string) {
    return await this.InterviewQuestionService.get(questionId);
  }

  @Get('answers/:questionId')
  async getAnswersByQuestionId(@Param('questionId') questionId: string) {
    return await this.InterviewQuestionService.getAnswersByQuestionId(
      questionId,
    );
  }
}
