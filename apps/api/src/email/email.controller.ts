import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminLogAction } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
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

  @UseGuards(JwtAuthGuard)
  @Post('send')
  /*async sendEmails(@Body() { emails, text, subject }: EmailsSendDto) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Email,
      `Poslan mail ${emails.join(',')} naziva ${subject}`,
    );

    return await this.emailService.sendEmail(emails, text, subject);
  }*/
  @UseGuards(JwtAuthGuard)
  @Post()
  async makeEmails(@Body() { emails, text }: EmailsDto) {
    const templates = await this.emailService.makeEmail(emails, text);
    return templates;
  }
}
