import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateInterviewSlotDto } from './dto/createInterviewSlot.dto';
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

  @Delete('/:id')
  async deleteInterviewSlot(id: string) {
    return await this.interviewSlotService.deleteInterviewSlot(id);
  }

  @Post()
  async createInterviewSlot(@Body() interviewSlotDto: CreateInterviewSlotDto) {
    return await this.interviewSlotService.createInterviewSlot(
      interviewSlotDto,
    );
  }
}
