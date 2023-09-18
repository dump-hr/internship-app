import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InternDisciplineService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.internDiscipline.findMany();
  }

  async getInternDiscipline(internId: string) {
    const internDisciplines = await this.prisma.internDiscipline.findFirst({
      where: { internId },
    });
    return internDisciplines.discipline;
  }
}
