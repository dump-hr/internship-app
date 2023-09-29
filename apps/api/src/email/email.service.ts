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
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        interviewStatus: true,
        internDisciplines: {
          select: {
            discipline: true,
            priority: true,
            status: true,
          },
        },
        interviewSlot: {
          select: {
            start: true,
            end: true,
            score: true,
          },
        },
      },
    });
    const template = nunjucks.compile(emailText);
    return interns.map((intern) => template.render({ intern }));
  }
}
