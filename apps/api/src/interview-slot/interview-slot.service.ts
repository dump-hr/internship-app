import { Injectable } from '@nestjs/common';
import { Discipline } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

import { CreateInterviewSlotDto } from './dto/createInterviewSlot.dto';

@Injectable()
export class InterviewSlotService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const interviewSlots = await this.prisma.interviewSlot.findMany({
      include: {
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

  async getByInterviewers(interviewerNames: string[]) {
    const interviewSlots = await this.prisma.interviewSlot.findMany({
      where: {
        interviewers: {
          some: {
            interviewer: {
              name: {
                in: interviewerNames,
              },
            },
          },
        },
      },
      include: {
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

  async getByDisciplines(disciplines: string[]) {
    const mappedDisciplines: Discipline[] = disciplines.map((str) => {
      switch (str) {
        case 'Development':
          return Discipline.Development;
        case 'Design':
          return Discipline.Design;
        case 'Multimedia':
          return Discipline.Multimedia;
        case 'Marketing':
          return Discipline.Marketing;
        default:
          return Discipline.Development;
      }
    });

    const interviewSlots = await this.prisma.interviewSlot.findMany({
      where: {
        interviewers: {
          some: {
            interviewer: {
              disciplines: {
                hasSome: mappedDisciplines,
              },
            },
          },
        },
      },
      include: {
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
    return await this.prisma.interviewSlot.delete({
      where: { id },
    });
  }

  async createInterviewSlot(interviewSlotDto: CreateInterviewSlotDto) {
    const { start, end } = interviewSlotDto;
    const interviewSlots = [];

    const slotDuration = 20 * 60 * 1000;

    for (
      let currentTime = new Date(start).getTime();
      currentTime < new Date(end).getTime();
      currentTime += slotDuration
    ) {
      const slotStart = new Date(currentTime);
      const slotEnd = new Date(currentTime + slotDuration);

      const interviewSlot = await this.prisma.interviewSlot.create({
        data: {
          start: slotStart,
          end: slotEnd,
          answers: JSON.stringify({}),
          notes: interviewSlotDto.notes,
        },
      });

      interviewSlots.push(interviewSlot);

      for (const interviewerName of interviewSlotDto.interviewers) {
        const interviewer = await this.prisma.interviewer.findFirst({
          where: { name: interviewerName },
        });

        if (interviewer) {
          await this.prisma.interviewMemberParticipation.create({
            data: {
              interviewSlotId: interviewSlot.id,
              interviewerId: interviewer.id,
            },
          });
        }
      }
    }
    return interviewSlots;
  }
}
