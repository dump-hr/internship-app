import { Injectable } from '@nestjs/common';
import * as nunjucks from 'nunjucks';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmailService {
  constructor(private readonly prisma: PrismaService) {}

  async sendEmail() {
    return 'Email sent!'; //TODO later
  }

  async makeEmail(userEmail: string, emailText: string) {
    const intern = await this.prisma.intern.findUnique({
      where: { email: userEmail },
    });
    const template = nunjucks.compile(emailText);
    const html = template.render({ intern });
    return html;
  }
}
