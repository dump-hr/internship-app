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
} from '@nestjs/common';
import {
  Discipline,
  DisciplineStatus,
  InterviewStatus,
  TestStatus,
} from '@prisma/client';
import * as postmark from 'postmark';
import { PrismaService } from 'src/prisma.service';

import * as disposableEmailBlocklist from './disposable-email-blocklist.json';
import { CreateInternDto } from './dto/createIntern.dto';

@Injectable()
export class InternService {
  constructor(private readonly prisma: PrismaService) {}

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

    const generalTextBody = `Pozdrav ${internToCreate.firstName},

    Hvala na prijavi na DUMP Internship 2024. Uskoro ćemo te obavijestiti o sljedećim koracima prijave.
    Ako imaš pitanja oko internshipa ili procesa prijave slobodno nam se javi na info@dump.hr
    
    U svakom trenutku možeš provjeriti status svoje prijave na https://internship.dump.hr/status/${newIntern.id}`;

    const marketingFormAdditionalText = `U nastavku se nalazi link na formu, za područje Marketing, koju je obavezno ispuniti prije samog intervjua za DUMP Internship. 
    Za ispunjavanje je predviđeno 15ak minuta, ali uzmi vremena koliko god ti treba. 

    Link: https://bit.ly/marketing-forma`;

    const devFormAdditionalText = `U nastavku se nalazi link na primjer prošlogodišnjeg ispita za smjer programiranja na DUMP Internshipu.
    Zadatke možeš rješavati u jednom od sljedećih jezika: JavaScript, Python, C#, C++, C, Java, Go, a za rješavanje je predviđeno 90 minuta.

    Link: https://bit.ly/primjer-inicijalnog`;

    const generalTextEnding = `Lijep pozdrav,
    
    DUMP Udruga mladih programera
    dump.hr`;

    let fullGeneralText = generalTextBody;

    if (internToCreate.disciplines.includes(Discipline.Marketing))
      fullGeneralText += `\n\n${marketingFormAdditionalText}`;

    if (internToCreate.disciplines.includes(Discipline.Development))
      fullGeneralText += `\n\n${devFormAdditionalText}`;

    this.postmark.sendEmail({
      From: 'info@dump.hr',
      To: internToCreate.email,
      Subject: 'Prijava na DUMP Internship',
      TextBody: `${fullGeneralText}\n\n${generalTextEnding}`,
      MessageStream: 'outbound',
    });

    return newIntern;
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
