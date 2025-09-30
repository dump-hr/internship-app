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
import { AdminLogAction } from '@prisma/client';
import { Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';
import { MemberGuard } from 'src/auth/azure.guard';
import { LoggerService } from 'src/logger/logger.service';

import { EmailsDto } from './dto/emails.dto';
import { EmailsSendDto } from './dto/emailsSend.dto';
import { EmailService } from './email.service';

@Controller('email')
@ApiTags('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly loggerService: LoggerService,
  ) {}

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

  @Get('logo')
  async getImageLogo(@Query('emailId') emailId: string, @Res() res: Response) {
    await this.emailService.updateIsSeen(emailId);

    const imagePath = join(
      process.cwd(),
      'apps',
      'api',
      'dist',
      'logo',
      'dump-logo-internship.png',
    );

    console.log('ImagePath: ', imagePath);

    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    } else {
      res.status(404).send('File not found');
    }
  }
}
