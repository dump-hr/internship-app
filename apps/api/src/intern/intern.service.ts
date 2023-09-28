import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  BoardAction,
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
import { PrismaService } from 'src/prisma.service';

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

  async get(id: string) {
    return await this.prisma.intern.findUnique({
      where: { id },
      include: {
        internDisciplines: true,
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
                maxPoints: true,
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
            testStatus: TestStatus.Pending,
          },
          data: {
            testStatus: TestStatus.PickTerm,
            testSlotId: null,
          },
        });

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

  private getInitialTestStatus(discipline) {
    return [Discipline.Development, Discipline.Design].includes(discipline)
      ? TestStatus.PickTerm
      : null;
  }
}
