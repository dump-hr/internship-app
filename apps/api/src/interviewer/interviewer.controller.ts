import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateInterviewerDto } from './dto/createInterviewer.dto';
import { InterviewerService } from './interviewer.service';

@Controller('interviewer')
@ApiTags('interviewer')
export class InterviewerController {
  constructor(private readonly interviewerService: InterviewerService) {}

  @Get()
  async getAll() {
    const interviewers = await this.interviewerService.getAll();
    return interviewers;
  }

  @Post()
  async create(@Body() interviewer: CreateInterviewerDto) {
    const newInterviewer = await this.interviewerService.create(interviewer);
    return newInterviewer;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedInterviewer = await this.interviewerService.delete(id);
    return deletedInterviewer;
  }

  @Get('participations')
  async getInterviewersParticipations() {
    return await this.interviewerService.getInterviewersParticipations();
  }
}
