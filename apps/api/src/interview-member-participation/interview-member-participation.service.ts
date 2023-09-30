import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewMemberParticipationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.interviewMemberParticipation.findMany();
  }
}
