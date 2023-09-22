import { Injectable } from '@nestjs/common';
import { Discipline } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.interviewer.findMany();
  }

  async findByDiscipline(discipline: string) {
    return await this.prisma.interviewer.findMany({
      where: {
        disciplines: {
          has: Discipline[discipline],
        },
      },
    });
  }
}
