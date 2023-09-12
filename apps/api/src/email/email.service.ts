import { Injectable } from '@nestjs/common';
import * as nunjucks from 'nunjucks';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmailService {
  constructor(private readonly prisma: PrismaService) {}

  async sendEmail() {
    return 'Email sent!'; //TODO later
  }

  async makeEmail(emails: string[], emailText: string) {
    const interns = await this.prisma.intern.findMany({
      where: { email: { in: emails } },
    });
    const template = nunjucks.compile(emailText);
    const htmls = [];
    interns.forEach((intern) => {
      htmls.push(template.render({ intern }));
    });
    return htmls;
  }
}
