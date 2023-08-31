import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InternService {
  constructor(private readonly prisma: PrismaService) {}

  async get(id: string) {
    const intern = await this.prisma.intern.findUnique({
      where: { id: id },
      });

    return intern;
  }

  async getAll() {
    const interns = await this.prisma.intern.findMany();

    return interns;
  }
}