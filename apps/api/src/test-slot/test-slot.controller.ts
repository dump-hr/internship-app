import { ScheduleTestRequest } from '@internship-app/types';
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Discipline } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

import { TestSlotService } from './test-slot.service';

@Controller('test-slot')
@ApiTags('test-slot')
export class TestSlotController {
  constructor(private readonly testSlotService: TestSlotService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return await this.testSlotService.getAll();
  }

  @Get('available/:discipline/:internId')
  async getAvailableSlots(
    @Param('internId') internId: string,
    @Param('discipline') discipline: Discipline,
  ) {
    return await this.testSlotService.getAvailableSlots(internId, discipline);
  }

  @Patch('schedule/:slotId')
  async scheduleTest(
    @Param('slotId') slotId: string,
    @Body() { internId }: ScheduleTestRequest,
  ) {
    return await this.testSlotService.scheduleTest(slotId, internId);
  }
}
