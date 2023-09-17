import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewSlotService {
  constructor(private readonly prisma: PrismaService) {}
}
