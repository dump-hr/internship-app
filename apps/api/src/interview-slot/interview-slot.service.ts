import { Answer } from '@internship-app/types';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Discipline, InterviewStatus, Prisma } from '@prisma/client';
import * as postmark from 'postmark';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';

import { CreateInterviewSlotDto } from './dto/createInterviewSlot.dto';

@Injectable()
export class InterviewSlotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  private postmark = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);

  async getAll() {
    const interviewSlots = await this.prisma.interviewSlot.findMany({
      include: {
        intern: true,
        interviewers: {
          include: {
            interviewer: true,
            interviewSlot: true,
          },
        },
      },
    });
    return interviewSlots;
  }

  async deleteInterviewSlot(id: string) {
    const interviewToDelete = await this.prisma.interviewSlot.findUnique({
      where: { id },
      include: {
        intern: true,
      },
    });

    if (interviewToDelete.intern) {
      throw new BadRequestException(
        'Interview is already scheduled! Cancel the interview first!',
      );
    }

    return this.prisma.interviewSlot.delete({
      where: { id: interviewToDelete.id },
    });
  }

  async createInterviewSlot(interviewSlotDto: CreateInterviewSlotDto) {
    const { start, end } = interviewSlotDto;
    const interviewSlots = [];

    const slotDuration = 20 * 60 * 1000;

    try {
      await this.prisma.$transaction(async (prisma) => {
        for (
          let currentTime = new Date(start).getTime();
          currentTime < new Date(end).getTime();
          currentTime += slotDuration
        ) {
          const slotStart = new Date(currentTime);
          const slotEnd = new Date(currentTime + slotDuration);

          const interviewSlot = await prisma.interviewSlot.create({
            data: {
              start: slotStart,
              end: slotEnd,
              answers: {},
            },
          });

          interviewSlots.push(interviewSlot);

          for (const interviewerId of interviewSlotDto.interviewers) {
            await prisma.interviewMemberParticipation.create({
              data: {
                interviewSlotId: interviewSlot.id,
                interviewerId: interviewerId,
              },
            });
          }
        }
      });

      return interviewSlots;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getAvailableSlots(internId: string) {
    const intern = await this.prisma.intern.findUnique({
      where: { id: internId },
      include: {
        internDisciplines: {
          orderBy: {
            priority: 'asc',
          },
        },
        interviewSlot: true,
      },
    });

    if (!intern) {
      throw new NotFoundException('Intern not found');
    }

    if (intern.interviewSlot) {
      throw new BadRequestException('Interview already scheduled');
    }

    if (intern.interviewStatus !== InterviewStatus.PickTerm) {
      throw new BadRequestException(
        'Intern does not have the right to schedule interview',
      );
    }

    const [primaryDiscipline, ...otherDisciplines] =
      intern.internDisciplines.filter((ind) => ind.status === 'Pending');

    const availableSlots = await this.prisma.interviewSlot.findMany({
      where: {
        internId: null,
        start: {
          gte: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
        },
        AND: [
          {
            interviewers: {
              some: {
                interviewer: {
                  disciplines: {
                    has: primaryDiscipline.discipline,
                  },
                },
              },
            },
          },
          otherDisciplines.length > 0
            ? {
                interviewers: {
                  some: {
                    interviewer: {
                      disciplines: {
                        hasSome: otherDisciplines.map((d) => d.discipline),
                      },
                    },
                  },
                },
              }
            : {},
        ],
      },
      orderBy: {
        start: 'asc',
      },
    });

    return availableSlots;
  }

  async getAvailableSlotsByDisciplines() {
    const disciplineCombinations = await this.prisma.$queryRaw<
      { disciplines: Discipline[]; needed: number }[]
    >(
      Prisma.sql`
          select disciplines, count(*) ::integer as needed
          from (select DISTINCT array_agg("InternDiscipline".discipline ORDER BY "priority" ASC) as "disciplines",
                                "Intern".id
                from "Intern"
                         left join "InternDiscipline" on "InternDiscipline"."internId" = "Intern".id
                where "Intern"."interviewStatus" = 'PickTerm'
                group by "Intern".id) as disciplineCombinations
          group by disciplines
          order by needed desc
      `,
    );

    const interviewSlots = await Promise.all(
      disciplineCombinations.map(async (dc) => {
        const [primary, ...other] = dc.disciplines;

        const available = await this.prisma.interviewSlot.count({
          where: {
            internId: null,
            start: {
              gte: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
            },
            AND: [
              {
                interviewers: {
                  some: {
                    interviewer: {
                      disciplines: {
                        has: primary,
                      },
                    },
                  },
                },
              },
              other.length > 0
                ? {
                    interviewers: {
                      some: {
                        interviewer: {
                          disciplines: {
                            hasSome: other,
                          },
                        },
                      },
                    },
                  }
                : {},
            ],
          },
        });

        return {
          ...dc,
          available,
        };
      }),
    );

    return interviewSlots;
  }

  async scheduleInterview(slotId: string, internId: string) {
    const slot = await this.prisma.interviewSlot.findUnique({
      where: { id: slotId },
    });

    if (slot.internId) {
      throw new NotFoundException('Slot is already taken');
    }

    if (
      new Date(new Date().getTime() + 4 * 60 * 60 * 1000 - 60 * 1000) >
      slot.start
    )
      throw new NotFoundException('Too late to schedule slot');

    const internSlot = await this.prisma.interviewSlot.findFirst({
      where: { internId },
    });

    if (internSlot) {
      throw new NotFoundException('Intern already has a slot');
    }

    const intern = await this.prisma.intern.findUnique({
      where: { id: internId },
    });

    const internData = { id: intern.id, email: intern.email };

    const createdEmail = await this.emailService.createEmailForIntern(
      internData,
      'Uspješno biranje termina za DUMP Internship intervju',
      `Pozdrav ${intern.firstName} ${intern.lastName} intern id: ${intern.id}...`,
    );

    const emailId = createdEmail.id;

    const emailText = `
    Pozdrav ${intern.firstName},<br/><br/>

    biranje termina intervjua je uspješno provedeno!<br/>
    Termin svog intervjua možeš vidjeti na status stranici:<br/>
    <a href="https://internship.dump.hr/status/${intern.id}" style="color:#007BFF; text-decoration:none;">https://internship.dump.hr/status/${intern.id}</a><br/><br/>

    U slučaju da ipak ne možeš doći na odabrani termin, javi nam se na vrijeme na 
    <a href="mailto:info@dump.hr" style="color:#007BFF; text-decoration:none;">info@dump.hr</a>.<br/><br/>

    <b>Podsjećamo:</b><br/>
    Tvoj intervju će se održati u odabranom terminu u našem uredu (prostorija <b>A223</b>) na FESB-u (Ruđera Boškovića 32).<br/><br/>

    <b>Kako doći:</b><br/>
    Kad uđeš kroz glavna vrata FESB-a skreni desno do kraja hodnika (put referade) dok ne dođeš do stepenica s lijeve strane. 
    Popni se na prvi kat, skreni lijevo i nastavi hodnikom do kraja – s desne strane vidjet ćeš vrata našeg ureda (A223).<br/><br/>

    Vidimo se!
    `;

    this.postmark.sendEmail({
      From: 'info@dump.hr',
      To: intern.email,
      Subject: 'Uspješno biranje termina za DUMP Internship intervju',
      HtmlBody: `
  <!DOCTYPE html>
  <html lang="hr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DUMP Internship</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:20px 0;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); overflow:hidden;">
            <tr>
              <td align="center" style="padding:20px;">
                <img src="https://internship.dump.hr/api/email/logo?emailId=${emailId}" alt="DUMP Logo" width="180" />
              </td>
            </tr>
            <tr>
              <td style="padding:30px; color:#333333; font-size:16px; line-height:1.5;">
                ${emailText}
              </td>
            </tr>
            <tr>
              <td style="padding:20px; background:#f9f9f9; color:#555555; font-size:14px; line-height:1.4; text-align:center;">
                Lijep pozdrav,<br/><br/>
                <strong>DUMP Udruga mladih programera</strong><br/>
                <a href="https://dump.hr" style="color:#007BFF; text-decoration:none;">dump.hr</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
      MessageStream: 'outbound',
    });

    return this.prisma.intern.update({
      where: { id: internId, interviewStatus: InterviewStatus.PickTerm },
      data: {
        interviewStatus: InterviewStatus.Pending,
        interviewSlot: {
          connect: {
            id: slotId,
          },
        },
      },
      include: {
        interviewSlot: {
          include: {
            interviewers: { include: { interviewer: true } },
          },
        },
      },
    });
  }

  async updateQuestionInAnswers(
    slotId: string,
    question: string,
    answerId: string,
  ) {
    const slot = await this.prisma.interviewSlot.findUnique({
      where: { id: slotId },
      select: { answers: true },
    });

    if (!slot || !Array.isArray(slot.answers))
      throw new BadRequestException(
        'Slot not found or answers are not in expected format',
      );

    const updatedAnswers = slot.answers.map((answer: Answer) =>
      answer.id === answerId ? { ...answer, question } : answer,
    );

    await this.prisma.interviewSlot.update({
      where: { id: slotId },
      data: { answers: updatedAnswers },
    });

    return { success: true };
  }

  async updateFlagInAnswers(slotId: string, tick: boolean, answerId: string) {
    const slot = await this.prisma.interviewSlot.findUnique({
      where: { id: slotId },
      select: { answers: true },
    });

    if (!slot || !Array.isArray(slot.answers))
      throw new BadRequestException(
        'Slot not found or answers are not in expected format',
      );

    const updatedAnswers = slot.answers.map((answer: Answer) =>
      answer.id === answerId ? { ...answer, tick } : answer,
    );

    await this.prisma.interviewSlot.update({
      where: { id: slotId },
      data: { answers: updatedAnswers },
    });

    return { success: true };
  }
}
