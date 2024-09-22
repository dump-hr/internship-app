import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.testQuestion.findMany({
      select: {
        id: true,
        title: true,
      },
    });
  }
}
