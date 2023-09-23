import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma.service';

import { CreateInterviewerDto } from './dto/createInterviewer.dto';

@Injectable()
export class InterviewerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const interviewers = await this.prisma.interviewer.findMany();
    return interviewers;
  }

  async create(interviewerToCreate: CreateInterviewerDto) {
    const interviewerWithTheSameName = await this.prisma.interviewer.findFirst({
      where: {
        name: {
          equals: interviewerToCreate.name,
          mode: 'insensitive',
        },
      },
    });

    if (interviewerWithTheSameName) {
      throw new BadRequestException(
        'Interviewer with the same name already exists',
      );
    }

    const newInterviewer = await this.prisma.interviewer.create({
      data: interviewerToCreate,
    });

    return newInterviewer;
  }
}
