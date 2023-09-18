import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EmailsDto } from './dto/emails.dto';
import { EmailService } from './email.service';

@Controller('email')
@ApiTags('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async makeEmails(@Body() { emails, text }: EmailsDto) {
    const templates = await this.emailService.makeEmail(emails, text);
    console.log(templates);
    return templates;
  }
}
