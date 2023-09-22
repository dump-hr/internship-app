import { Injectable } from '@nestjs/common';
import { Discipline } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewSlotService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const interviewSlots = await this.prisma.interviewSlot.findMany();
    return interviewSlots;
  }

  async getByDiscipline(discipline: string) {
    const interviewSlots = await this.prisma.interviewSlot.findMany({
      where: {
        interviewers: {
          some: {
            interviewer: {
              disciplines: {
                has: Discipline[discipline],
              },
            },
          },
        },
      },
    });
    return interviewSlots;
  }
}
