import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InterviewStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

import { CreateInterviewerDto } from './dto/createInterviewer.dto';

@Injectable()
export class InterviewerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const interviewers = await this.prisma.interviewer.findMany({
      include: {
        interviews: {
          select: {
            interviewSlot: {
              select: {
                score: true,
              },
            },
          },
          where: {
            interviewSlot: {
              intern: {
                interviewStatus: InterviewStatus.Done,
              },
            },
          },
        },
      },
    });

    const interviewersWithStats = interviewers
      .map((interviewer) => ({
        ...interviewer,
        interviews: null,
        _count: { interviews: interviewer.interviews.length },
        _avg: {
          score:
            interviewer.interviews.reduce(
              (acc, curr) => acc + curr.interviewSlot.score,
              0,
            ) / interviewer.interviews.length,
        },
      }))
      .sort((a, b) => b._count.interviews - a._count.interviews);

    return interviewersWithStats;
  }

  async create(interviewerToCreate: CreateInterviewerDto) {
    const interviewerWithTheSameEmail = await this.prisma.interviewer.findFirst(
      {
        where: {
          email: {
            equals: interviewerToCreate.email,
            mode: 'insensitive',
          },
        },
      },
    );

    if (interviewerWithTheSameEmail) {
      throw new BadRequestException(
        'Interviewer with the same email already exists',
      );
    }

    const newInterviewer = await this.prisma.interviewer.create({
      data: interviewerToCreate,
    });

    return newInterviewer;
  }

  async delete(id: string) {
    const interviewerToDelete = await this.prisma.interviewer.findUnique({
      where: {
        id: id,
      },
    });

    if (!interviewerToDelete) {
      throw new BadRequestException('Interviewer does not exist');
    }

    const deletedInterviewer = await this.prisma.interviewer.delete({
      where: {
        id,
      },
    });

    return deletedInterviewer;
  }

  async getInterviewersParticipations() {
    return await this.prisma.interviewMemberParticipation.findMany();
  }
}
