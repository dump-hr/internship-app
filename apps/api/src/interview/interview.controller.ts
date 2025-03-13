import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewQuestionDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { AdminLogAction } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';

@Controller('interview')
export class InterviewController {
  constructor(
    private readonly interviewService: InterviewService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post('questions')
  async create(@Body() createInterviewQuestionDto: CreateInterviewQuestionDto) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Create,
      `Kreiranje pitanja ${createInterviewQuestionDto.question}`,
    );

    const newInterviewer = await this.interviewService.create(
      createInterviewQuestionDto,
    );
    return newInterviewer;
  }

  @Get('questions')
  async getAll() {
    return await this.interviewService.getAll();
  }

  @Get('answers/:questionId')
  async getAnswersByQuestionId(@Param('questionId') questionId: string) {
    return await this.interviewService.getAnswersByQuestionId(questionId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterviewDto: UpdateInterviewDto,
  ) {
    return this.interviewService.update(+id, updateInterviewDto);
  }
}
