import { Controller, Get, Param } from '@nestjs/common';

import { InterviewerService } from './interviewer.service';

@Controller('interviewers')
export class InterviewerController {
  constructor(private readonly interviewerService: InterviewerService) {}

  @Get()
  findAll() {
    return this.interviewerService.findAll();
  }
}
