import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Discipline, InterviewStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

import { CreateInterviewSlotDto } from './dto/createInterviewSlot.dto';

@Injectable()
export class InterviewSlotService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const interviewSlots = await this.prisma.interviewSlot.findMany({
      include: {
        intern: true,
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
    const interviewToDelete = await this.prisma.interviewSlot.findUnique({
      where: { id },
      include: {
        intern: true,
      },
    });

    if (interviewToDelete.intern) {
      throw new BadRequestException(
        'Interview is already scheduled! Cancel the interview first!',
      );
    }

    return await this.prisma.interviewSlot.delete({
      where: { id: interviewToDelete.id },
    });
  }

  async createInterviewSlot(interviewSlotDto: CreateInterviewSlotDto) {
    const { start, end } = interviewSlotDto;
    const interviewSlots = [];

    const slotDuration = 15 * 60 * 1000;

    try {
      await this.prisma.$transaction(async (prisma) => {
        for (
          let currentTime = new Date(start).getTime();
          currentTime < new Date(end).getTime();
          currentTime += slotDuration
        ) {
          const slotStart = new Date(currentTime);
          const slotEnd = new Date(currentTime + slotDuration);

          const interviewSlot = await prisma.interviewSlot.create({
            data: {
              start: slotStart,
              end: slotEnd,
              answers: {},
            },
          });

          interviewSlots.push(interviewSlot);

          for (const interviewerId of interviewSlotDto.interviewers) {
            await prisma.interviewMemberParticipation.create({
              data: {
                interviewSlotId: interviewSlot.id,
                interviewerId: interviewerId,
              },
            });
          }
        }
      });

      return interviewSlots;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
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
        start: {
          gte: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
        },
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
      orderBy: {
        start: 'asc',
      },
    });

    return availableSlots;
  }

  async getAvailableSlotsByDisciplines() {
    const disciplineCombinations = await this.prisma.$queryRaw<
      { disciplines: Discipline[]; needed: number }[]
    >(
      Prisma.sql`
        select disciplines, count(*)::integer as needed from 
        (
          select DISTINCT array_agg("InternDiscipline".discipline ORDER BY "priority" ASC) as "disciplines", "Intern".id 
          from "Intern" 
		      left join "InternDiscipline" on "InternDiscipline"."internId" = "Intern".id 
          where "Intern"."interviewStatus" = 'PickTerm'
		      group by "Intern".id
        ) as disciplineCombinations
        group by disciplines
        order by needed desc
      `,
    );

    const interviewSlots = await Promise.all(
      disciplineCombinations.map(async (dc) => {
        const [primary, ...other] = dc.disciplines;

        const available = await this.prisma.interviewSlot.count({
          where: {
            internId: null,
            start: {
              gte: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
            },
            AND: [
              {
                interviewers: {
                  some: {
                    interviewer: {
                      disciplines: {
                        has: primary,
                      },
                    },
                  },
                },
              },
              other.length > 0
                ? {
                    interviewers: {
                      some: {
                        interviewer: {
                          disciplines: {
                            hasSome: other,
                          },
                        },
                      },
                    },
                  }
                : {},
            ],
          },
        });

        return {
          ...dc,
          available,
        };
      }),
    );

    return interviewSlots;
  }

  async scheduleInterview(slotId: string, internId: string) {
    const slot = await this.prisma.interviewSlot.findUnique({
      where: { id: slotId },
    });

    if (slot.internId) {
      throw new NotFoundException('Slot is already taken');
    }

    if (
      new Date(new Date().getTime() + 4 * 60 * 60 * 1000 - 60 * 1000) >
      slot.start
    )
      throw new NotFoundException('Too late to schedule slot');

    const internSlot = await this.prisma.interviewSlot.findFirst({
      where: { internId },
    });

    if (internSlot) {
      throw new NotFoundException('Intern already has a slot');
    }

    const intern = await this.prisma.intern.findUnique({
      where: { id: internId },
    });

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
