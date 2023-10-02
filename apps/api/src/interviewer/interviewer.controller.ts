import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

import { CreateInterviewerDto } from './dto/createInterviewer.dto';
import { InterviewerService } from './interviewer.service';

@Controller('interviewer')
@ApiTags('interviewer')
export class InterviewerController {
  constructor(private readonly interviewerService: InterviewerService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    const interviewers = await this.interviewerService.getAll();
    return interviewers;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() interviewer: CreateInterviewerDto) {
    const newInterviewer = await this.interviewerService.create(interviewer);
    return newInterviewer;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    const deletedInterviewer = await this.interviewerService.delete(id);
    return deletedInterviewer;
  }

  @Get('participations')
  @UseGuards(JwtAuthGuard)
  async getInterviewersParticipations() {
    return await this.interviewerService.getInterviewersParticipations();
  }
}
