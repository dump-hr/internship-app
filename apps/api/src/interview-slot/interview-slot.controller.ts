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
import { AdminGuard, MemberGuard } from 'src/auth/azure.guard';
import { LoggerService } from 'src/logger/logger.service';

import { CreateInterviewSlotDto } from './dto/createInterviewSlot.dto';
import { InterviewSlotService } from './interview-slot.service';
import { GraphService } from './graph.service';

@Controller('interview-slot')
@ApiTags('interview-slot')
export class InterviewSlotController {
  constructor(
    private readonly interviewSlotService: InterviewSlotService,
    private readonly loggerService: LoggerService,
    private readonly graphService: GraphService,
  ) {}

  @Get()
  @UseGuards(MemberGuard)
  async getAll() {
    return await this.interviewSlotService.getAll();
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async deleteInterviewSlot(@Param('id') id: string) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Delete,
      `Brisanje interview slota ${id}`,
    );

    return await this.interviewSlotService.deleteInterviewSlot(id);
  }

  @Post()
  @UseGuards(AdminGuard)
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
    const interview = await this.interviewSlotService.scheduleInterview(
      slotId,
      internId,
    );
    console.log('creating event', interview);

    await this.graphService.createEvent({
      subject: `Intervju s ${interview.firstName} ${interview.lastName}`,
      start: interview.interviewSlot.start.toISOString(),
      end: interview.interviewSlot.end.toISOString(),
      roomEmail: process.env.DUMP_OFFICE_EMAIL,
      roomName: 'Ured',
      attendees: interview.interviewSlot.interviewers
        .filter((i) => !!i.interviewer.email)
        .map((interviewer) => ({
          emailAddress: {
            address: interviewer.interviewer.email,
            name: interviewer.interviewer.name,
          },
          type: 'required',
        })),
    });

    return interview;
  }

  @Patch('/answers/:slotId')
  @UseGuards(AdminGuard)
  async answerInterview(
    @Param('slotId') slotId: string,
    @Body() body: { question: string; answerId: string },
  ) {
    return await this.interviewSlotService.updateQuestionInAnswers(
      slotId,
      body.question,
      body.answerId,
    );
  }

  @Patch('/tick/:slotId')
  @UseGuards(MemberGuard)
  async answerInterviewTick(
    @Param('slotId') slotId: string,
    @Body() body: { tick: boolean; answerId: string },
  ) {
    return await this.interviewSlotService.updateFlagInAnswers(
      slotId,
      body.tick,
      body.answerId,
    );
  }
}
