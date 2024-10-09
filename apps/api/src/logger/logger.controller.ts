import { GetAdminLogsRequest } from '@internship-app/types';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

import { LoggerService } from './logger.service';

@Controller('logger')
@ApiTags('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get('/admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAdminLogs(@Query() req: GetAdminLogsRequest) {
    req = { ...req, skip: +req.skip, take: +req.take };
    return await this.loggerService.getAdminLogs(req);
  }
}
