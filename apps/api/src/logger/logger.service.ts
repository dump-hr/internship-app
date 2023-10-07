import { GetAdminLogsRequest } from '@internship-app/types';
import { Injectable } from '@nestjs/common';
import { AdminLogAction, InternLogAction, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LoggerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAdminLogs(req: GetAdminLogsRequest) {
    const filter: Prisma.AdminLogWhereInput = {
      ...(req.action && { action: req.action }),
      ...(req.description && {
        description: { contains: req.description, mode: 'insensitive' },
      }),
    };

    const count = await this.prisma.adminLog.count({ where: filter });
    const logs = await this.prisma.adminLog.findMany({
      where: filter,
      take: req.take,
      skip: req.skip,
      orderBy: { date: 'desc' },
    });

    return {
      count,
      logs,
    };
  }

  async createInternLog(internId: string, action: InternLogAction) {
    return await this.prisma.internLog.create({
      data: {
        internId,
        action,
      },
    });
  }

  async createAdminLog(action: AdminLogAction, description: string) {
    return await this.prisma.adminLog.create({
      data: {
        action,
        description,
      },
    });
  }
}
