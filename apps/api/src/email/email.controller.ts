import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EmailsDto } from './dto/emails.dto';
import { EmailService } from './email.service';

@Controller('email')
@ApiTags('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async makeEmails(@Body() body: EmailsDto) {
    const emails = body.emails;
    const emailText = body.text;

    const templates = await this.emailService.makeEmail(emails, emailText);
    console.log(templates);
    return templates;
  }
}
