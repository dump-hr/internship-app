import {
  CreateTestSlotsRequest,
  SubmitTestRequest,
  TestSlot,
} from '@internship-app/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Discipline, TestStatus } from '@prisma/client';
import * as postmark from 'postmark';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TestSlotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  private postmark = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);

  async getAll() {
    const testSlots = await this.prisma.testSlot.findMany({
      include: {
        _count: {
          select: {
            internDisciplines: true,
            testQuestions: true,
          },
        },
      },
    });

    return testSlots;
  }

  async get(id: string) {
    return await this.prisma.testSlot.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        testQuestions: true,
        internDisciplines: {
          include: {
            intern: true,
          },
        },
      },
    });
  }

  async create(testSlotDto: CreateTestSlotsRequest) {
    return await this.prisma.$transaction(
      testSlotDto.map((slot) =>
        this.prisma.testSlot.create({
          data: {
            capacity: slot.capacity,
            discipline: slot.discipline,
            start: slot.start,
            end: slot.end,
            location: slot.location,
            password: slot.password,
            maxPoints: 0,
          },
        }),
      ),
    );
  }

  async update(id: string, testSlot: TestSlot) {
    await this.prisma.testSlot.update({
      where: { id },
      data: {
        start: testSlot.start,
        end: testSlot.end,
        capacity: testSlot.capacity,
        location: testSlot.location,
        maxPoints: testSlot.maxPoints,
        password: testSlot.password,
        testQuestions: {
          deleteMany: {
            testSlotId: id,
            NOT: testSlot.testQuestions.map((tq) => ({ id: tq.id })),
          },
          upsert: testSlot.testQuestions.map((tq) => ({
            where: { id: tq.id || '' },
            create: tq,
            update: tq,
          })),
        },
      },
    });
  }

  async delete(id: string) {
    const internsOnSlotCount = await this.prisma.internDiscipline.count({
      where: { testSlotId: id },
    });

    if (internsOnSlotCount)
      throw new BadRequestException(
        'Test with linked interns cannot be removed! Try manually cancelling intern test slots.',
      );

    return await this.prisma.testSlot.delete({ where: { id } });
  }

  async getAvailableSlots(internId: string, discipline: Discipline) {
    const internDiscipline = await this.prisma.internDiscipline.findUnique({
      where: {
        internId_discipline: {
          internId,
          discipline,
        },
      },
      include: {
        testSlot: true,
      },
    });

    if (!internDiscipline) {
      throw new NotFoundException('Intern with such discipline not found');
    }

    if (internDiscipline.testSlot) {
      throw new BadRequestException('Test already scheduled');
    }

    if (internDiscipline.testStatus !== TestStatus.PickTerm) {
      throw new BadRequestException('Intern has no right to schedule test');
    }

    const slots = await this.prisma.testSlot.findMany({
      where: {
        discipline,
        start: {
          gte: new Date(new Date().getTime() + 10 * 60 * 1000),
        },
      },
      include: {
        _count: {
          select: {
            internDisciplines: true,
          },
        },
      },
      orderBy: {
        start: 'asc',
      },
    });

    const availableSlots = slots
      .filter((s) => s._count.internDisciplines < s.capacity)
      .map((s) => ({ ...s, password: undefined }));

    return availableSlots;
  }

  async scheduleTest(slotId: string, internId: string) {
    const slot = await this.prisma.testSlot.findUnique({
      where: { id: slotId },
      include: {
        _count: {
          select: {
            internDisciplines: true,
          },
        },
      },
    });

    if (slot._count.internDisciplines > slot.capacity) {
      throw new NotFoundException('Slot is already taken');
    }

    if (new Date(new Date().getTime() + 9 * 60 * 1000) > slot.start)
      throw new NotFoundException('Too late to schedule slot');

    const internDiscipline = await this.prisma.internDiscipline.findUnique({
      where: {
        internId_discipline: {
          internId,
          discipline: slot.discipline,
        },
      },
      include: {
        intern: true,
      },
    });

    if (internDiscipline.testStatus !== TestStatus.PickTerm) {
      throw new NotFoundException('Intern has no right to pick this slot');
    }

    const intern = internDiscipline.intern;

    const internData = { id: intern.id, email: intern.email };

    const createdEmail = await this.emailService.createEmailForIntern(
      internData,
      'Uspješno biranje termina za DUMP Internship inicijalni ispit',
      `Pozdrav ${intern.firstName} ${intern.lastName} intern id: ${intern.id}...`,
    );
    const emailId = createdEmail.id;

    const trackImage = `<img src="https://internship.dump.hr/api/email/image?emailId=${emailId}" width="1" height="1" style="display:none" />`;

    await this.postmark.sendEmail({
      From: 'info@dump.hr',
      To: intern.email,
      Subject: 'Uspješno biranje termina za DUMP Internship inicijalni ispit',
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
          <!-- Container -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); overflow:hidden;">
            <tr>
              <td align="center" style="padding:20px;">
                <!-- LOGO Placeholder -->
                <img src="https://internship.dump.hr/api/email/logo" alt="DUMP Logo" width="180" />
              </td>
            </tr>
            <tr>
              <td style="padding:30px; color:#333333; font-size:16px; line-height:1.5;">
                Pozdrav ${intern.firstName},<br/><br/>

                Biranje termina inicijalnog dev testa je <b>uspješno provedeno!</b><br/>
                Termin svog ispita možeš vidjeti na status stranici:<br/>
                <a href="https://internship.dump.hr/status/${intern.id}" style="color:#007BFF; text-decoration:none;">
                  https://internship.dump.hr/status/${intern.id}
                </a><br/><br/>

                U slučaju da ne možeš doći na odabrani termin, javi nam se na vrijeme na 
                <a href="mailto:info@dump.hr" style="color:#007BFF; text-decoration:none;">info@dump.hr</a>.<br/><br/>

                <b>Detalji ispita:</b><br/>
                • Ispit će se održati u jednom od računalnih laboratorija FESB-a.<br/>
                • Dođi <b>10 minuta ranije</b> u atrij fakulteta, nakon čega ćemo te uputiti u učionicu.<br/>
                • Rješavaš na našem računalu u jednom od ponuđenih jezika:<br/>
                  JavaScript, Python, C#, C++, C, Java, Go.<br/>
                • Ispit sadrži 4 zadatka i traje <b>100 minuta</b>.<br/><br/>

                Primjer ispita možeš vidjeti ovdje:<br/>
                <a href="https://bit.ly/inicijalni-primjer" style="color:#007BFF; text-decoration:none;">
                  https://bit.ly/inicijalni-primjer
                </a><br/><br/>

                Tvoj rezultat testa poslat ćemo ti <b>najkasnije tri dana</b> nakon odabranog termina.  
                Ako položiš, dobit ćeš link za biranje termina intervjua.<br/><br/>

                <b>Sretno i vidimo se!</b>
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
    ${trackImage}
  </body>
  </html>
  `,
      MessageStream: 'outbound',
    });

    return await this.prisma.internDiscipline.update({
      where: {
        internId_discipline: {
          discipline: slot.discipline,
          internId,
        },
      },
      data: {
        testStatus: TestStatus.Pending,
        testSlot: {
          connect: {
            id: slotId,
          },
        },
      },
    });
  }

  async chooseTest(password: string) {
    const testSlot = await this.prisma.testSlot.findFirst({
      where: { password },
    });

    if (!testSlot) throw new BadRequestException('Such test does not exist!');

    return testSlot;
  }

  async startTest(testSlotId: string, email: string, password: string) {
    const internDiscipline = await this.prisma.internDiscipline.findFirst({
      where: {
        intern: {
          email: {
            equals: email,
            mode: 'insensitive',
          },
        },
        testSlotId,
        testStatus: TestStatus.Pending,
      },
      include: {
        testSlot: {
          include: {
            testQuestions: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });

    if (!internDiscipline) {
      throw new BadRequestException(
        'Test does not exist or intern does not have permission to access',
      );
    }

    const slot = internDiscipline.testSlot;

    if (!slot) throw new NotFoundException('Slot not found');

    if (password !== slot.password)
      throw new BadRequestException('Wrong password');

    if (new Date() < slot.start)
      throw new BadRequestException('Test not started yet');

    return slot;
  }

  async submitTest(testSlotId: string, test: SubmitTestRequest) {
    const internDiscipline = await this.prisma.internDiscipline.findFirst({
      where: {
        intern: {
          email: {
            equals: test.internEmail,
            mode: 'insensitive',
          },
        },
        testSlotId,
        testStatus: TestStatus.Pending,
      },
      include: {
        testSlot: {
          select: { password: true },
        },
      },
    });

    if (!internDiscipline)
      throw new BadRequestException(
        'Test does not exist or intern does not have permission to submit',
      );

    if (internDiscipline.testSlot.password !== test.password)
      throw new BadRequestException('Wrong password!');

    await this.prisma.internDiscipline.update({
      where: {
        internId_discipline: {
          internId: internDiscipline.internId,
          discipline: internDiscipline.discipline,
        },
      },
      data: {
        testStatus: TestStatus.Done,
        internQuestionAnswers: {
          createMany: {
            data: test.answers.map((a) => ({
              code: a.code,
              questionId: a.questionId,
              language: a.language,
            })),
          },
        },
      },
    });

    return internDiscipline.internId;
  }

  async getTestAnswersByIntern(testSlotId: string, internId: string) {
    const internDiscipline = await this.prisma.internDiscipline.findFirst({
      where: {
        internId,
        testSlotId,
        testStatus: TestStatus.Done,
      },
    });

    if (!internDiscipline)
      throw new BadRequestException('Test does not exist or is not done');

    return await this.prisma.internQuestionAnswer.findMany({
      where: {
        internDisciplineInternId: internId,
        internDisciplineDiscipline: internDiscipline.discipline,
      },
      include: {
        question: true,
      },
      orderBy: {
        question: {
          order: 'asc',
        },
      },
    });
  }

  async getTestAnswersByQuestion(questionId: string) {
    return await this.prisma.internQuestionAnswer.findMany({
      where: {
        questionId,
      },
      include: {
        question: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async setScore(answerId: string, score: number) {
    return await this.prisma.internQuestionAnswer.update({
      where: {
        id: answerId,
      },
      data: {
        score,
      },
    });
  }
}
