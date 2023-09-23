import { BadRequestException, Injectable } from '@nestjs/common';
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
        internDisciplines: true,
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

    const newIntern = await this.prisma.intern.create({
      data: internToCreate,
    });

    return newIntern;
  }
}
