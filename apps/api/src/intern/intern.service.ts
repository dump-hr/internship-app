import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { CreateInternDto } from './dto/createIntern.dto';

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

  async create(internToCreate: CreateInternDto) {
    const internWithTheSameEmail = await this.prisma.intern.findFirst({
      where: {
        email: {
          equals: internToCreate.email,
          mode: 'insensitive',
        },
      },
    });

    if (internWithTheSameEmail) {
      throw new BadRequestException(
        'Intern with the same email already exists',
      );
    }

    const newIntern = await this.prisma.intern.create({
      data: internToCreate,
    });

    return newIntern;
  }
}
