import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
}
