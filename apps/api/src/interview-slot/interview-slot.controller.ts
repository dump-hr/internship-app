import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateInterviewSlotDto } from './dto/createInterviewSlot.dto';
import { InterviewSlotService } from './interview-slot.service';

@Controller('interview-slot')
@ApiTags('interview-slot')
export class InterviewSlotController {
  constructor(private readonly interviewSlotService: InterviewSlotService) {}

  @Get()
  async getAll(
    @Query('disciplines') disciplines: string,
    @Query('interviewers') interviewers: string,
  ) {
    let interviewSlotsFilteredByDiscipline = [];
    let interviewSlotsFilteredByInterviewer = [];
    let allInterviewSlots = [];
    if (disciplines) {
      interviewSlotsFilteredByDiscipline =
        await this.interviewSlotService.getByDisciplines(
          disciplines ? disciplines.split(',') : [],
        );
    }
    if (interviewers) {
      interviewSlotsFilteredByInterviewer =
        await this.interviewSlotService.getByInterviewers(
          interviewers ? interviewers.split(',') : [],
        );
    }
    if (!interviewers && !disciplines) {
      allInterviewSlots = await this.interviewSlotService.getAll();
    }
    return [
      ...allInterviewSlots,
      ...interviewSlotsFilteredByDiscipline,
      ...interviewSlotsFilteredByInterviewer,
    ];
  }

  @Delete('/:id')
  async deleteInterviewSlot(@Param('id') id: string) {
    return await this.interviewSlotService.deleteInterviewSlot(id);
  }

  @Post()
  async createInterviewSlot(@Body() interviewSlotDto: CreateInterviewSlotDto) {
    return await this.interviewSlotService.createInterviewSlot(
      interviewSlotDto,
    );
  }
}
