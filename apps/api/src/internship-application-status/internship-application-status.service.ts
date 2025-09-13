import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InternshipApplicationStatusService {
  constructor(private readonly prisma: PrismaService) {}
  async findFirst() {
    return await this.prisma.internshipApplicationStatus.findUnique({
      where: { id: 1 },
    });
  }

  async update(isOpened: boolean) {
    return await this.prisma.internshipApplicationStatus.update({
      where: { id: 1 },
      data: { isOpened: isOpened },
    });
  }
}
