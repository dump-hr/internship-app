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
      HtmlBody: `Pozdrav ${intern.firstName},
    biranje termina inicijalnog dev testa je uspješno provedeno! Termin svog ispita možeš vidjeti na status stranici: https://internship.dump.hr/status/${intern.id}
    U slučaju da ne možeš doći na odabrani termin, javi nam se na vrijeme na info@dump.hr
    
    Također, podsjećamo da će se ispit održati u jednom od računalnih laboratorija FESB-a. Potrebno je doći 10 minuta prije odabranog termina u atrij fakulteta, nakon čega ćemo te uputiti u učionicu u kojoj tipkaš ispit. Ispit rješavaš na našem računalu u jednom od ponuđenih jezika (JavaScript, Python, C#, C++, C, Java, Go). Sastoji se od četiri zadatka za koje imaš 100 minuta.
    
    Primjer ispita možeš vidjeti na sljedećem linku: https://bit.ly/inicijalni-primjer
    
    Tvoj rezultat testa poslat ćemo ti najkasnije tri dana nakon odabranog termina. U slučaju položenog ispita, dobit ćeš link za biranje termina intervjua.
    
    Sretno i vidimo se!
    
    DUMP Udruga mladih programera ${trackImage}`,
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
