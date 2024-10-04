import { ScheduleInterviewRequest } from '@internship-app/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminLogAction, InternLogAction } from '@prisma/client';
import { MemberGuard } from 'src/auth/admin.guard';
import { LoggerService } from 'src/logger/logger.service';

import { CreateInterviewSlotDto } from './dto/createInterviewSlot.dto';
import { InterviewSlotService } from './interview-slot.service';

@Controller('interview-slot')
@ApiTags('interview-slot')
export class InterviewSlotController {
  constructor(
    private readonly interviewSlotService: InterviewSlotService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  @UseGuards(MemberGuard)
  async getAll() {
    return await this.interviewSlotService.getAll();
  }

  @Delete('/:id')
  @UseGuards(MemberGuard)
  async deleteInterviewSlot(@Param('id') id: string) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Delete,
      `Brisanje interview slota ${id}`,
    );

    return await this.interviewSlotService.deleteInterviewSlot(id);
  }

  @Post()
  @UseGuards(MemberGuard)
  async createInterviewSlot(@Body() interviewSlotDto: CreateInterviewSlotDto) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Create,
      `Kreiranje interview slota u ${interviewSlotDto.start}`,
    );

    return await this.interviewSlotService.createInterviewSlot(
      interviewSlotDto,
    );
  }

  @Get('available/:internId')
  async getAvailableSlots(@Param('internId') internId: string) {
    await this.loggerService.createInternLog(
      internId,
      InternLogAction.OpenInterviewPage,
    );

    return await this.interviewSlotService.getAvailableSlots(internId);
  }

  @Get('availability')
  async getAvailableSlotsByDisciplines() {
    return await this.interviewSlotService.getAvailableSlotsByDisciplines();
  }

  @Patch('schedule/:slotId')
  async scheduleInterview(
    @Param('slotId') slotId: string,
    @Body() { internId }: ScheduleInterviewRequest,
  ) {
    return await this.interviewSlotService.scheduleInterview(slotId, internId);
  }
}
