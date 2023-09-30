import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { InterviewMemberParticipationService } from './interview-member-participation.service';

@Controller('interview-member-participation')
@ApiTags('interview-member-participation')
export class InterviewMemberParticipationController {
  constructor(
    private readonly interviewMemberParticipationService: InterviewMemberParticipationService,
  ) {}

  @Get()
  async getAll() {
    return await this.interviewMemberParticipationService.getAll();
  }
}
