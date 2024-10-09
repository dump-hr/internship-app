import {
  ChooseTestRequest,
  CreateTestSlotsRequest,
  ScheduleTestRequest,
  SetScoreRequest,
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminLogAction, Discipline, InternLogAction } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { LoggerService } from 'src/logger/logger.service';

import { TestSlotService } from './test-slot.service';

@Controller('test-slot')
@ApiTags('test-slot')
export class TestSlotController {
  constructor(
    private readonly testSlotService: TestSlotService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  async get(@Param('id') id: string) {
    return await this.testSlotService.get(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createTestSlot(@Body() testSlotDto: CreateTestSlotsRequest) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Create,
      `Kreiranje ${testSlotDto.length} testova`,
    );

    return await this.testSlotService.create(testSlotDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateTestSlot(
    @Param('id') testSlotId: string,
    @Body() { data }: UpdateTestSlotRequest,
  ) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Update,
      `Updateanje testa ${testSlotId}`,
    );

    return await this.testSlotService.update(testSlotId, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Delete,
      `Brisanje testa ${id}`,
    );

    return await this.testSlotService.delete(id);
  }

  @Get('available/:discipline/:internId')
  async getAvailableSlots(
    @Param('internId') internId: string,
    @Param('discipline') discipline: Discipline,
  ) {
    await this.loggerService.createInternLog(
      internId,
      InternLogAction.OpenTestPage,
    );

    return await this.testSlotService.getAvailableSlots(internId, discipline);
  }

  @Patch('schedule/:id')
  async scheduleTest(
    @Param('id') slotId: string,
    @Body() { internId }: ScheduleTestRequest,
  ) {
    return await this.testSlotService.scheduleTest(slotId, internId);
  }

  @Post('choose')
  async chooseTest(@Body() { password }: ChooseTestRequest) {
    return await this.testSlotService.chooseTest(password);
  }

  @Post('start/:id')
  async startTest(
    @Param('id') testSlotId: string,
    @Body() { internEmail, password }: StartTestRequest,
  ) {
    return await this.testSlotService.startTest(
      testSlotId,
      internEmail,
      password,
    );
  }

  @Post('submit/:id')
  async submitTest(
    @Param('id') testSlotId: string,
    @Body() req: SubmitTestRequest,
  ) {
    return await this.testSlotService.submitTest(testSlotId, req);
  }

  @Get('answers/:testSlotId/intern/:internId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getTestAnswersByIntern(
    @Param('testSlotId') testSlotId: string,
    @Param('internId') internId: string,
  ) {
    return await this.testSlotService.getTestAnswersByIntern(
      testSlotId,
      internId,
    );
  }

  @Get('answers/:testSlotId/question/:questionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getTestAnswersByQuestion(@Param('questionId') questionId: string) {
    return await this.testSlotService.getTestAnswersByQuestion(questionId);
  }

  @Put('score/:answerId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async setScore(
    @Param('answerId') answerId: string,
    @Body() { score }: SetScoreRequest,
  ) {
    return await this.testSlotService.setScore(answerId, +score);
  }
}
