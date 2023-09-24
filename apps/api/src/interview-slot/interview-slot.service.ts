import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InterviewStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewSlotService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const interviewSlots = await this.prisma.interviewSlot.findMany();
    return interviewSlots;
  }

  async getAvailableSlots(internId: string) {
    const intern = await this.prisma.intern.findUnique({
      where: { id: internId },
      include: {
        internDisciplines: {
          orderBy: {
            priority: 'asc',
          },
        },
        interviewSlot: true,
      },
    });

    if (!intern) {
      throw new NotFoundException('Intern not found');
    }

    if (intern.interviewSlot) {
      throw new BadRequestException('Interview already scheduled');
    }

    if (intern.interviewStatus !== InterviewStatus.PickTerm) {
      throw new BadRequestException(
        'Intern does not have the right to schedule interview',
      );
    }

    const [primaryDiscipline, ...otherDisciplines] =
      intern.internDisciplines.filter((ind) => ind.status === 'Pending');

    const availableSlots = await this.prisma.interviewSlot.findMany({
      where: {
        internId: null,
        AND: [
          {
            interviewers: {
              some: {
                interviewer: {
                  disciplines: {
                    has: primaryDiscipline.discipline,
                  },
                },
              },
            },
          },
          otherDisciplines.length > 0
            ? {
                interviewers: {
                  some: {
                    interviewer: {
                      disciplines: {
                        hasSome: otherDisciplines.map((d) => d.discipline),
                      },
                    },
                  },
                },
              }
            : {},
        ],
      },
    });

    return availableSlots;
  }

  async scheduleInterview(slotId: string, internId: string) {
    const slot = await this.prisma.interviewSlot.findUnique({
      where: { id: slotId },
    });

    if (slot.internId) {
      throw new NotFoundException('Slot is already taken');
    }

    const internSlot = await this.prisma.interviewSlot.findFirst({
      where: { internId },
    });

    if (internSlot) {
      throw new NotFoundException('Intern already has a slot');
    }

    return await this.prisma.intern.update({
      where: { id: internId, interviewStatus: InterviewStatus.PickTerm },
      data: {
        interviewStatus: InterviewStatus.Pending,
        interviewSlot: {
          connect: {
            id: slotId,
          },
        },
      },
    });
  }
}
