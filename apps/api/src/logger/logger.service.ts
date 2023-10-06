import { Injectable } from '@nestjs/common';
import { InternLogAction } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LoggerService {
  constructor(private readonly prisma: PrismaService) {}

  async CreateInternLog(internId: string, action: InternLogAction) {
    return await this.prisma.internLog.create({
      data: {
        internId,
        action,
      },
    });
  }
}
