import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { InterviewSlotService } from './interview-slot.service';

@Controller('interview-slot')
@ApiTags('interview-slot')
export class InterviewSlotController {
  constructor(private readonly interviewSlotService: InterviewSlotService) {}

  @Get()
  async getAll() {
    const interviewSlots = await this.interviewSlotService.getAll();
    return interviewSlots;
  }

  @Get('/get-by-discipline/:discipline')
  async getByDiscipline(discipline: string) {
    const interviewSlots = await this.interviewSlotService.getByDiscipline(
      discipline,
    );
    return interviewSlots;
  }
}
