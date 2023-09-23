import { Injectable } from '@nestjs/common';
import { Discipline } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

import { CreateInterviewSlotDto } from './dto/createInterviewSlot.dto';

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

  async createInterviewSlot(interviewSlotDto: CreateInterviewSlotDto) {
    const interviewSlot = await this.prisma.interviewSlot.create({
      data: {
        start: interviewSlotDto.start,
        end: interviewSlotDto.end,
        answers: JSON.stringify({}), // TODO handle interview questions/answers
      },
    });

    for (const interviewerName of interviewSlotDto.interviewers) {
      const interviewer = await this.prisma.interviewer.findFirst({
        where: {
          name: interviewerName,
        },
      });
      if (!interviewer) {
        await this.prisma.interviewMemberParticipation.create({
          data: {
            interviewerId: interviewer.id,
            interviewSlotId: interviewSlot.id,
          },
        });
      }
    }

    return interviewSlot;
  }
}
