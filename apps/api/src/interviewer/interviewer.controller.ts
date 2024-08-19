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
import { AdminLogAction } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';

import { CreateInterviewerDto } from './dto/createInterviewer.dto';
import { InterviewerService } from './interviewer.service';

import { MemberGuard } from 'src/auth/admin.guard';

@Controller('interviewer')
@ApiTags('interviewer')
export class InterviewerController {
  constructor(
    private readonly interviewerService: InterviewerService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  @UseGuards(MemberGuard)
  async getAll() {
    const interviewers = await this.interviewerService.getAll();
    return interviewers;
  }

  @Post()
  @UseGuards(MemberGuard)
  async create(@Body() interviewer: CreateInterviewerDto) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Create,
      `Kreiranje intervjuista ${interviewer.email}`,
    );

    const newInterviewer = await this.interviewerService.create(interviewer);
    return newInterviewer;
  }

  @Delete(':id')
  @UseGuards(MemberGuard)
  async delete(@Param('id') id: string) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Delete,
      `Brisanje intervjuista ${id}`,
    );

    const deletedInterviewer = await this.interviewerService.delete(id);
    return deletedInterviewer;
  }

  @Get('participations')
  @UseGuards(MemberGuard)
  async getInterviewersParticipations() {
    return await this.interviewerService.getInterviewersParticipations();
  }
}
