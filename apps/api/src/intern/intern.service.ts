import { BoardAction, SetInterviewRequest } from '@internship-app/types';
import { BadRequestException, Injectable } from '@nestjs/common';
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

    const getInitialTestStatus = (discipline) =>
      [Discipline.Development, Discipline.Design].includes(discipline)
        ? TestStatus.PickTerm
        : null;

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
              testStatus: getInitialTestStatus(dis),
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

      default:
        return new BadRequestException();
    }
  }
}
