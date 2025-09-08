import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminLogAction } from '@prisma/client';
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

  @Get('image')
  async getImage(@Query('emailId') emailId: string, @Res() res: Response) {
    await this.emailService.updateIsSeen(emailId);

    const pixel: Buffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADfgH+WBwLfwAAAABJRU5ErkJggg==',
      'base64',
    );

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': pixel.length,
    });

    res.end(pixel);
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
