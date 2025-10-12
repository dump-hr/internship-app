import {
  BoardActionType,
  Intern,
  InterviewStatus,
} from '@internship-app/types';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as nunjucks from 'nunjucks';
import * as postmark from 'postmark';
import { InternService } from 'src/intern/intern.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly internService: InternService,
  ) {}

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

    const createdEmails = await Promise.all(
      interns.map((i) => this.createEmailForIntern(i, subject, text)),
    );

    const template = nunjucks.compile(text);

    return Promise.allSettled(
      interns.map((intern) => {
        const emailId = createdEmails.find(
          (email) => email.internId === intern.id,
        ).id;
        const trackImage = `<img src="https://internship.dump.hr/api/email/logo?emailId=${emailId}" width="1" height="1" style="display:none" />`;

        return this.postmark.sendEmail({
          From: 'info@dump.hr',
          To: intern.email,
          Subject: subject,
          HtmlBody: `<pre style="font-family: Calibri; white-space:pre-wrap;">${template.render(
            {
              intern,
            },
          )}</pre> ${trackImage}`,
          TextBody: `${template.render({ intern })}`,
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

  async createEmailForIntern(
    intern: { id: string; email: string },
    subject: string,
    text: string,
  ) {
    return await this.prisma.email.create({
      data: {
        internId: intern.id,
        subject: subject,
        body: text,
        isSeen: false,
      },
    });
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

  @Cron('0 0 8 * * *', { timeZone: 'UTC+2' })
  async sendInterviewInvitations() {
    const newInterns: Intern[] = await this.prisma.$queryRaw`
    select i.email
    from "Intern" i
      left join "InternDiscipline" id on i.id = id."internId"
      where i."createdAt" >= NOW() - INTERVAL '1 day'
        and id."discipline" <> 'Development'
        and id.status = 'Pending'
        and i."interviewStatus" = 'Pending'
    `;

    const ids = newInterns.map((newIntern) => newIntern.id);

    this.internService.applyBoardAction(
      {
        actionType: BoardActionType.SetInterviewStatus,
        interviewStatus: InterviewStatus.PickTerm,
      },
      ids,
    );

    const emails = newInterns.map((intern) => intern.email);

    this.sendEmail(
      emails,
      `Vezano za tvoju prijavu na ovogodišnji DUMP Internship, pozivamo te da sudjeluješ u prvom krugu intervjua koji će se održati kroz ovaj tjedan. Ako ti ne odgovara ni jedan od ponuđenih termina, ne brini - vremenom ćemo ih dodati još.
        Pripazi; kako vrijeme bude prolazilo, bit će sve manja ponuda termina.
        Ovo su tvoja prijavljena područja:
        Ukoliko želiš promijeniti prijavljena područja, javi nam se na info@dump.hr, i to prije nego što odabereš intervju termin.
        Molimo te da u nastavku izabereš termin koji ti najviše odgovara prateći sljedeće upute:
        - Otvori svoju status stranivu iz prethodnog maila
        - Odaberi jedan od ponuđenih dostupnih datuma, nakon čega ti se otvore dostupni termini
        - Odaberi jedan od ponuđenih termina, nakon čega ti se otvori potvrdna forma
        - Klik na confirm i tvoj termin je uspješno rezerviran!
        Tvoj intervju će se održati u odabranom terminu u našem uredu (prostorija A223) na FESB-u (Ruđera Boškovića 32).
        Naš ured ćeš pronaći tako da kad uđeš kroz glavna vrata FESB-a skreneš desno do kraja hodnika (put referade) dok ne dođeš do stepenica koje su s lijeve strane. Popneš se stepenicama na prvi kat i skreneš lijevo. Nastaviš hodnikom do kraja i s desne strane vidjet ćeš vrata našeg ureda (A223).
        Važno:
        Molimo te da ne ulaziš u ured dok te ne pozovemo, nego da čekaš ispred.
        Ako kojim slučajem ne možeš doći, moguće je intervju organizirati videopozivom uz prethodnu najavu nemogućnosti dolaska.
        Međutim, dojam je uvijek bolji uživo!
        Vidimo se!
        DUMP Udruga mladih programera`,
      'Poziv na dump internrship intervju',
    );
  }
}
