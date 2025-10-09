import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  BoardAction,
  CreateNoteRequest,
  InternAction,
  InternDecisionRequest,
  SetInterviewRequest,
} from '@internship-app/types';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  Discipline,
  DisciplineStatus,
  InterviewStatus,
  TestStatus,
} from '@prisma/client';
import * as postmark from 'postmark';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';

import * as disposableEmailBlocklist from './disposable-email-blocklist.json';
import { CreateInternDto } from './dto/createIntern.dto';

type SendEmailPayload = {
  From: string;
  To: string;
  Subject: string;
  HtmlBody: string;
  MessageStream: string;
};

@Injectable()
export class InternService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  private readonly logger = new Logger(InternService.name);

  private s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: 'eu-central-1',
  });

  private postmark = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);

  async get(id: string) {
    return await this.prisma.intern.findUnique({
      where: { id },
      include: {
        internDisciplines: {
          include: {
            testSlot: true,
          },
          orderBy: {
            priority: 'asc',
          },
        },
        interviewSlot: {
          include: {
            interviewers: {
              include: {
                interviewer: true,
              },
            },
          },
        },
        logs: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });
  }

  async getAll() {
    const interns = await this.prisma.intern.findMany({
      include: {
        internDisciplines: {
          orderBy: {
            priority: 'asc',
          },
        },
        interviewSlot: {
          select: {
            score: true,
          },
        },
        _count: {
          select: {
            logs: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return interns;
  }

  async getApplicationStatus(id: string) {
    const applicationInfo = await this.prisma.intern.findUnique({
      where: { id },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        interviewStatus: true,
        internDisciplines: {
          select: {
            discipline: true,
            status: true,
            testStatus: true,
            testScore: true,
            testSlot: {
              select: {
                start: true,
                end: true,
              },
            },
            internQuestionAnswers: {
              select: {
                score: true,
                question: {
                  select: {
                    points: true,
                  },
                },
              },
              orderBy: {
                question: {
                  order: 'asc',
                },
              },
            },
          },
        },
        interviewSlot: {
          select: {
            start: true,
            end: true,
          },
        },
      },
    });

    return applicationInfo;
  }

  async create(internToCreate: CreateInternDto) {
    const internWithTheSameEmail = await this.prisma.intern.findFirst({
      where: {
        email: {
          equals: internToCreate.email,
          mode: 'insensitive',
        },
      },
    });

    if (internWithTheSameEmail) {
      throw new BadRequestException(
        'Intern with the same email already exists',
      );
    }

    const internDateOfBirth = new Date(
      internToCreate.data.dateOfBirth as string,
    );

    const milisecondsInYear = 1000 * 60 * 60 * 24 * 365;
    const internAgeInMiliseconds =
      new Date().getTime() - internDateOfBirth.getTime();

    if (
      internAgeInMiliseconds / milisecondsInYear < 10 ||
      internAgeInMiliseconds / milisecondsInYear > 35
    ) {
      throw new BadRequestException('Birth date out of range');
    }

    const isDisposableEmail = disposableEmailBlocklist.includes(
      internToCreate.email.split('@')[1],
    );

    if (isDisposableEmail) {
      throw new BadRequestException('Disposable email is not allowed');
    }

    const initialInterviewStatus = internToCreate.disciplines.some(
      (dis) => dis === Discipline.Development,
    )
      ? InterviewStatus.NoRight
      : InterviewStatus.PickTerm;

    const newIntern = await this.prisma.intern.create({
      data: {
        firstName: internToCreate.firstName,
        lastName: internToCreate.lastName,
        email: internToCreate.email,
        data: internToCreate.data,
        interviewStatus: initialInterviewStatus,
        internDisciplines: {
          createMany: {
            data: internToCreate.disciplines.map((dis, index) => ({
              discipline: dis,
              priority: index,
              status: DisciplineStatus.Pending,
              testStatus: this.getInitialTestStatus(dis),
            })),
          },
        },
      },
    });

    const intern = await this.prisma.intern.findUnique({
      where: { id: newIntern.id },
    });

    const data = { id: intern.id, email: intern.email };

    const createdEmails = await this.emailService.createEmailForIntern(
      data,
      'Prijava na DUMP Internship',
      `Pozdrav ${intern.firstName} ${intern.lastName} intern id: ${intern.id}...`,
    );
    const emailId = createdEmails.id;

    const generalTextBody = `Pozdrav ${internToCreate.firstName},

    Hvala na prijavi na DUMP Internship 2025. Uskoro ćemo te obavijestiti o sljedećim koracima prijave.
    Ako imaš pitanja oko internshipa ili procesa prijave slobodno nam se javi na info@dump.hr
    
    U svakom trenutku možeš provjeriti status svoje prijave na https://internship.dump.hr/status/${newIntern.id}`;

    const marketingFormAdditionalText = `U nastavku se nalazi link na formu, za područje Marketing, koju je obavezno ispuniti prije samog intervjua za DUMP Internship. 
    Za ispunjavanje je predviđeno 15ak minuta, ali uzmi vremena koliko god ti treba. 

    Link: https://bit.ly/MarketingForma2`;

    const devFormAdditionalText = `U nastavku se nalazi link na primjer prošlogodišnjeg ispita za smjer programiranja na DUMP Internshipu.
    Zadatke možeš rješavati u jednom od sljedećih jezika: JavaScript, Python, C#, C++, C, Java, Go, a za rješavanje je predviđeno 90 minuta.

    Link: https://bit.ly/primjer-inicijalnog-2025`;

    const designFormAdditionalText = `U nastavku se nalazi link na upute za izradu moodboarda, koji je obvezno izraditi za smjer dizajna na DUMP Internshipu.
    
    Link: https://bit.ly/designMoodboard`;

    let fullGeneralText = generalTextBody;

    if (internToCreate.disciplines.includes(Discipline.Marketing))
      fullGeneralText += `\n\n${marketingFormAdditionalText}`;

    if (internToCreate.disciplines.includes(Discipline.Development))
      fullGeneralText += `\n\n${devFormAdditionalText}`;

    if (internToCreate.disciplines.includes(Discipline.Design))
      fullGeneralText += `\n\n${designFormAdditionalText}`;

    let isSent = false;
    try {
      this.logger.log('Creating payload');
      const postmarkPayload = {
        From: 'info@dump.hr',
        To: internToCreate.email,
        Subject: 'Prijava na DUMP Internship',
        HtmlBody: `
  <!DOCTYPE html>
  <html lang="hr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DUMP Internship 2025</title>
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
                ${fullGeneralText.replace(/\n/g, '<br/>')}
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
      };

      this.logger.log(
        'Starting with sendWithRetry, payload: ',
        postmarkPayload,
      );

      const result = await this.sendWithRetry(postmarkPayload);
      this.logger.log(
        `Registration email sent for internId=${newIntern.id} email=${internToCreate.email} postmarkMessageId=${result.response?.MessageID}`,
      );

      isSent = true;
    } catch (error) {
      // We intentionally do NOT fail the intern creation if email sending fails.
      this.logger.error(
        `Registration email FAILED after retries for internId=${
          newIntern.id
        } email=${internToCreate.email}: ${(error as any)?.message}`,
        (error as any)?.stack,
      );
      console.log(
        `Registration email FAILED after retries for internId=${
          newIntern.id
        } email=${internToCreate.email}: ${(error as any)?.message}`,
      );
    }

    console.log(`Returning intern ${newIntern}, is sent: ${isSent}`);

    return newIntern;
  }

  async sendWithRetry(
    payload: SendEmailPayload,
    opts = { retries: 3, baseDelayMs: 500 },
  ) {
    let lastError: any;
    for (let attempt = 1; attempt <= opts.retries; attempt++) {
      try {
        const ctrl = new AbortController();
        const timeout = setTimeout(() => ctrl.abort(), 8000); // 8s timeout
        const res = await this.postmark.sendEmail({
          ...payload,
          MessageStream: 'outbound',
        });
        clearTimeout(timeout);

        if (res.ErrorCode && res.ErrorCode !== 0) {
          throw new Error(
            `PostmarkError code=${res.ErrorCode} message=${res.Message}`,
          );
        }
        return { status: 'sent', response: res };
      } catch (err: any) {
        lastError = err;
        const transient = /ECONN|ETIMEDOUT|EAI_AGAIN|429|5\\d\\d/.test(
          String(err.code || err.message),
        );
        this.logger.warn(
          { err, attempt, to: payload.To, transient },
          'Email send attempt failed',
        );
        if (!transient || attempt === opts.retries) {
          const finalErr = err instanceof Error ? err : new Error(String(err));
          (finalErr as any).attempts = attempt;
          (finalErr as any).emailTo = payload.To;
          throw finalErr; // propagate so caller can log at error level
        }
        await new Promise((r) => setTimeout(r, opts.baseDelayMs * attempt));
      }
    }
    // Should not reach here, but throw defensively if it does
    throw lastError || new Error('Unknown email send failure');
  }

  async setInterview(internId: string, data: SetInterviewRequest) {
    await this.prisma.intern.update({
      where: {
        id: internId,
      },
      data: {
        interviewStatus: InterviewStatus.Done,
        interviewSlot: {
          update: { answers: data.answers, score: data.score },
        },
      },
    });
  }
  async setImage(internId: string, buffer: Buffer) {
    const key = `intern-images/${internId}-${new Date().getTime()}.png`;
    const command = new PutObjectCommand({
      Bucket: 'internship-app-uploads',
      Key: key,
      Body: buffer,
      ContentType: 'image/png',
    });

    try {
      await this.s3.send(command);

      const image = `https://internship-app-uploads.dump.hr/${key}`;

      await this.prisma.intern.update({
        where: {
          id: internId,
        },
        data: {
          image,
        },
      });

      return image;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async applyAction(internId: string, action: InternAction) {
    switch (action.actionType) {
      case 'AddDiscipline':
        return await this.prisma.intern.update({
          where: {
            id: internId,
            internDisciplines: {
              none: {
                discipline: action.discipline,
              },
            },
          },
          data: {
            internDisciplines: {
              create: {
                discipline: action.discipline,
                status: DisciplineStatus.Pending,
                testStatus: this.getInitialTestStatus(action.discipline),
                priority: -1,
              },
            },
          },
        });

      case 'RemoveDiscipline':
        const internDisciplines = await this.prisma.internDiscipline.findMany({
          where: { internId },
          select: { discipline: true },
        });
        if (internDisciplines.length < 2)
          throw new BadRequestException(
            'Intern should have at least 2 disciplines!',
          );

        return this.prisma.internDiscipline.delete({
          where: {
            internId_discipline: {
              internId: internId,
              discipline: action.discipline,
            },
          },
        });

      default:
        throw new BadRequestException();
    }
  }

  async applyBoardAction(action: BoardAction, internIds: string[]) {
    switch (action.actionType) {
      case 'SetInterviewStatus':
        return await this.prisma.intern.updateMany({
          where: { id: { in: internIds } },
          data: { interviewStatus: action.interviewStatus },
        });

      case 'SetTestStatus':
        return await this.prisma.internDiscipline.updateMany({
          where: { internId: { in: internIds }, discipline: action.discipline },
          data: { testStatus: action.testStatus },
        });

      case 'SetDiscipline':
        return await this.prisma.internDiscipline.updateMany({
          where: { internId: { in: internIds }, discipline: action.discipline },
          data: {
            ...(action.status && { status: action.status }),
            ...(action.testStatus && { testStatus: action.testStatus }),
          },
        });

      case 'Kick':
        await this.prisma.interviewSlot.updateMany({
          where: {
            intern: {
              id: { in: internIds },
              interviewStatus: InterviewStatus.Pending,
            },
          },
          data: { internId: null },
        });

        await this.prisma.intern.updateMany({
          where: {
            id: { in: internIds },
            interviewStatus: {
              in: [InterviewStatus.PickTerm, InterviewStatus.Pending],
            },
          },
          data: {
            interviewStatus: InterviewStatus.NoRight,
          },
        });

        await this.prisma.internDiscipline.updateMany({
          where: {
            internId: { in: internIds },
            testStatus: {
              in: [TestStatus.PickTerm, TestStatus.Pending],
            },
          },
          data: { testSlotId: null, testStatus: null },
        });

        return await this.prisma.internDiscipline.updateMany({
          where: { internId: { in: internIds } },
          data: {
            status: DisciplineStatus.Rejected,
          },
        });

      case 'CancelInterviewSlot':
        const internFilter = {
          id: { in: internIds },
          interviewStatus: InterviewStatus.Pending,
        };

        await this.prisma.interviewSlot.updateMany({
          where: {
            intern: internFilter,
          },
          data: {
            internId: null,
          },
        });

        return await this.prisma.intern.updateMany({
          where: internFilter,
          data: {
            interviewStatus: InterviewStatus.PickTerm,
          },
        });

      case 'CancelTestSlot':
        return await this.prisma.internDiscipline.updateMany({
          where: {
            internId: { in: internIds },
            discipline: action.discipline,
            testStatus: {
              in: [TestStatus.PickTerm, TestStatus.Pending],
            },
          },
          data: {
            testStatus: this.getInitialTestStatus(action.discipline),
            testSlotId: null,
          },
        });

      case 'SumTestPoints':
        const disciplinesWithResults =
          await this.prisma.internDiscipline.findMany({
            where: {
              internId: { in: internIds },
              discipline: action.discipline,
            },
            include: {
              internQuestionAnswers: {
                select: {
                  score: true,
                },
              },
            },
          });

        const updatedDisciplines = disciplinesWithResults.map((d) => ({
          internId: d.internId,
          discipline: d.discipline,
          score: d.internQuestionAnswers.reduce(
            (acc, curr) => acc + curr.score,
            0,
          ),
        }));

        return await this.prisma.$transaction(
          updatedDisciplines.map((d) =>
            this.prisma.internDiscipline.update({
              where: {
                internId_discipline: {
                  discipline: d.discipline,
                  internId: d.internId,
                },
              },
              data: {
                testScore: d.score,
              },
            }),
          ),
        );

      default:
        throw new BadRequestException();
    }
  }

  async setDecision(internId: string, data: InternDecisionRequest) {
    return await this.prisma.$transaction(
      data.disciplines.map((d) =>
        this.prisma.internDiscipline.update({
          where: {
            internId_discipline: {
              internId,
              discipline: d.discipline,
            },
          },
          data: {
            status: d.status,
          },
        }),
      ),
    );
  }

  async createNote(internId: string, data: CreateNoteRequest) {
    const { notes: currentNotes } = await this.prisma.intern.findUnique({
      where: { id: internId },
      select: { notes: true },
    });

    return await this.prisma.intern.update({
      where: {
        id: internId,
      },
      data: {
        notes: {
          set: currentNotes + `${data.note}\n`,
        },
      },
    });
  }

  async count() {
    return await this.prisma.intern.count();
  }

  private getInitialTestStatus(discipline) {
    return [Discipline.Development].includes(discipline)
      ? TestStatus.PickTerm
      : null;
  }
}
