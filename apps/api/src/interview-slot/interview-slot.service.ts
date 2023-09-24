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

  async deleteInterviewSlot(id: string) {
    return await this.prisma.interviewSlot.delete({
      where: {
        id,
      },
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
          answers: JSON.stringify({}), // TODO handle interview questions/answers
        },
      });

      interviewSlots.push(interviewSlot);
    }

    return interviewSlots;
  }
}
