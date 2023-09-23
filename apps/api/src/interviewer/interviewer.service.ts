import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const interviewers = await this.prisma.interviewer.findMany();
    return interviewers;
  }
}
