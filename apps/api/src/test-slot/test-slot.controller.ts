import {
  CreateTestSlotsRequest,
  ScheduleTestRequest,
  StartTestRequest,
  SubmitTestRequest,
  TestSlotPreviewDto,
  UpdateTestSlotRequest,
} from '@internship-app/types';
import { Discipline as DisciplineFE } from '@internship-app/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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
    const allSlots = await this.testSlotService.getAll();
    const testSlotsDto: TestSlotPreviewDto[] = allSlots.map((ts) => ({
      ...ts,
      discipline: ts.discipline as DisciplineFE,
      internCount: ts._count.internDisciplines,
      questionCount: ts._count.testQuestions,
    }));

    return testSlotsDto;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    return await this.testSlotService.get(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTestSlot(@Body() testSlotDto: CreateTestSlotsRequest) {
    return await this.testSlotService.create(testSlotDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTestSlot(
    @Param('id') testSlotId: string,
    @Body() { data }: UpdateTestSlotRequest,
  ) {
    return await this.testSlotService.update(testSlotId, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.testSlotService.delete(id);
  }

  @Get('available/:discipline/:internId')
  async getAvailableSlots(
    @Param('internId') internId: string,
    @Param('discipline') discipline: Discipline,
  ) {
    return await this.testSlotService.getAvailableSlots(internId, discipline);
  }

  @Patch('schedule/:id')
  async scheduleTest(
    @Param('id') slotId: string,
    @Body() { internId }: ScheduleTestRequest,
  ) {
    return await this.testSlotService.scheduleTest(slotId, internId);
  }

  @Post('start/:id')
  async startTest(
    @Param('id') testSlotId: string,
    @Body() { internEmail }: StartTestRequest,
  ) {
    return await this.testSlotService.startTest(testSlotId, internEmail);
  }

  @Post('submit/:id')
  async submitTest(
    @Param('id') testSlotId: string,
    @Body() req: SubmitTestRequest,
  ) {
    return await this.testSlotService.submitTest(testSlotId, req);
  }
}
