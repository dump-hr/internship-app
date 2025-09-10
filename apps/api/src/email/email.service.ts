import { Injectable } from '@nestjs/common';
import * as nunjucks from 'nunjucks';
import * as postmark from 'postmark';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmailService {
  constructor(private readonly prisma: PrismaService) {}

  private postmark = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);

  async sendEmail(emails: string[], text: string, subject: string) {
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

    const createdEmails = await this.createEmailsForInterns(
      interns,
      subject,
      text,
    );

    const template = nunjucks.compile(text);

    return Promise.allSettled(
      interns.map((intern) => {
        const emailId = createdEmails.find((email) => email.id === intern.id);

        const trackImage = `<img src="https://internship.dump.hr/api/email/image?emailId=${emailId}" width="1" height="1" style="display:none;" />`;

        return this.postmark.sendEmail({
          From: 'info@dump.hr',
          To: intern.email,
          Subject: subject,
          HtmlBody: `${template.render({ intern })} ${text}${trackImage}`,
          MessageStream: 'outbound',
        });
      }),
    );
  }

  async makeEmail(emails: string[], text: string) {
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

    const template = nunjucks.compile(text);

    return interns.map((intern) => template.render({ intern }));
  }

  async createEmailsForInterns(
    interns: { id: string; email: string }[],
    subject: string,
    text: string,
  ) {
    console.log('interns: ', interns);
    return await Promise.all(
      interns.map((intern) =>
        this.prisma.email.create({
          data: {
            internId: intern.id,
            subject: { subject },
            body: { text },
            isSeen: false,
          },
        }),
      ),
    );
  }

  async updateIsSeen(emailId: string) {
    const email = await this.prisma.email.findUnique({
      where: { id: emailId },
    });

    if (!email) throw new Error('Email not found');

    if (!email.isSeen) {
      await this.prisma.email.update({
        where: { id: emailId },
        data: { isSeen: true },
      });
    }
  }
}
