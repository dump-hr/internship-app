import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Sse,
} from '@nestjs/common';

import { AppService } from './app.service';
import {
  CreateEvaluationRequest,
  SendStdinRequest,
  SpawnProgramRequest,
} from './types';

@Controller('run')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthz')
  healthCheck(): string {
    return 'ok';
  }

  @Post('evaluate')
  async evaluateTestCases(@Body() cluster: CreateEvaluationRequest) {
    const evaluation = await this.appService.evaluateTestCases(cluster);
    return {
      testCases: evaluation,
      isAccepted: evaluation.every(
        (e) => e.evaluationStatus === 'AcceptedAnswer',
      ),
    };
  }

  @Post(':pid')
  async spawnProgram(
    @Param('pid') pid: string,
    @Body() { code, language }: SpawnProgramRequest,
  ) {
    return await this.appService.spawnProgram(pid, code, language);
  }

  @Sse(':pid')
  streamStdout(@Param('pid') pid: string) {
    return this.appService.streamStdout(pid);
  }

  @Put(':pid')
  async sendStdin(
    @Param('pid') pid: string,
    @Body() { text }: SendStdinRequest,
  ) {
    return this.appService.sendStdin(pid, text);
  }

  @Delete(':pid')
  killProgram(@Param('pid') pid: string) {
    return this.appService.killProgram(pid);
  }
}
