import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { InterviewQuestionService } from './interview-question.service';
import {
  InterviewQuestionAnswerDto,
  InterviewQuestionDto,
} from './dto/interview-question.dto';
import { AdminLogAction } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('interview/questions')
export class InterviewQuestionController {
  constructor(
    private readonly InterviewQuestionService: InterviewQuestionService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post('save')
  @UseGuards(JwtAuthGuard)
  async update(@Body() InterviewQuestionDtos: InterviewQuestionDto[]) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Create,
      `Updateanje pitanja`,
    );

    const updatedQuestions = await this.InterviewQuestionService.update(
      InterviewQuestionDtos,
    );
    return updatedQuestions;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return await this.InterviewQuestionService.getAll();
  }

  @Get('enabled')
  @UseGuards(JwtAuthGuard)
  async getEnabled() {
    return await this.InterviewQuestionService.getEnabled();
  }

  @Get(':questionId')
  @UseGuards(JwtAuthGuard)
  async get(@Param('questionId') questionId: string) {
    return await this.InterviewQuestionService.get(questionId);
  }

  @Get('answers/:questionId')
  @UseGuards(JwtAuthGuard)
  async getAnswersByQuestionId(@Param('questionId') questionId: string) {
    return await this.InterviewQuestionService.getAnswersByQuestionId(
      questionId,
    );
  }

  @Post('answers')
  @UseGuards(JwtAuthGuard)
  async addAnswers(
    @Body() InterviewQuestionAnswersDtos: InterviewQuestionAnswerDto[],
  ) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Create,
      `Dodavanje odgovora na pitanja`,
    );

    const updatedQuestions = await this.InterviewQuestionService.addAnswers(
      InterviewQuestionAnswersDtos,
    );
    return updatedQuestions;
  }

  @Patch('answers/:answerId')
  @UseGuards(JwtAuthGuard)
  async updateFlag(
    @Param('answerId') answerId: string,
    @Body() { flag }: { flag: boolean },
  ) {
    console.log(flag);
    return await this.InterviewQuestionService.updateFlag(answerId, flag);
  }
}
