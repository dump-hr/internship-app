import { ScheduleInterviewRequest } from '@internship-app/types';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { InterviewSlotService } from './interview-slot.service';

@Controller('interview-slot')
@ApiTags('interview-slot')
export class InterviewSlotController {
  constructor(private readonly interviewSlotService: InterviewSlotService) {}

  @Get()
  async getAll() {
    return await this.interviewSlotService.getAll();
  }

  @Get('available/:internId')
  async getAvailableSlots(@Param('internId') internId: string) {
    return await this.interviewSlotService.getAvailableSlots(internId);
  }

  @Patch('schedule/:slotId')
  async scheduleInterview(
    @Param('slotId') slotId: string,
    @Body() { internId }: ScheduleInterviewRequest,
  ) {
    return await this.interviewSlotService.scheduleInterview(slotId, internId);
  }
}
