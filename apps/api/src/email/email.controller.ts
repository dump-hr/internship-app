import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminLogAction, InternLogAction } from '@prisma/client';
import { MemberGuard } from 'src/auth/azure.guard';
import { LoggerService } from 'src/logger/logger.service';

import { EmailsDto } from './dto/emails.dto';
import { EmailsSendDto } from './dto/emailsSend.dto';
import { EmailService } from './email.service';
import { Response } from 'express';

@Controller('email')
@ApiTags('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get('open')
  async trackMail(@Query('internId') internId: string, @Res() res: Response) {
    await this.loggerService.createInternLog(
      internId,
      InternLogAction.EmailOpened,
    );

    const transparent = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADfgH+WBwLfwAAAABJRU5ErkJggg==',
      'base64',
    );

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': transparent.length,
    });

    res.end(transparent);
  }

  @UseGuards(MemberGuard)
  @Post('send')
  async sendEmails(@Body() { emails, text, subject }: EmailsSendDto) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Email,
      `Poslan mail ${emails.join(',')} naziva ${subject}`,
    );

    return await this.emailService.sendEmail(emails, text, subject);
  }

  @UseGuards(MemberGuard)
  @Post()
  async makeEmails(@Body() { emails, text }: EmailsDto) {
    const templates = await this.emailService.makeEmail(emails, text);
    return templates;
  }
}
