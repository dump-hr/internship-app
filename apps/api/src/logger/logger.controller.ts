import { GetAdminLogsRequest } from '@internship-app/types';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoggerService } from './logger.service';
import { MemberGuard } from 'src/auth/admin.guard';

@Controller('logger')
@ApiTags('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get('/admin')
  @UseGuards(MemberGuard)
  async getAdminLogs(@Query() req: GetAdminLogsRequest) {
    req = { ...req, skip: +req.skip, take: +req.take };
    return await this.loggerService.getAdminLogs(req);
  }
}
