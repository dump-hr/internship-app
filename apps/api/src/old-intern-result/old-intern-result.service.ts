import { PrismaService } from 'src/prisma.service';
import { FindDto } from './dto/find.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OldInternResultService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(findDto: FindDto) {
    return this.prisma.oldInternResult.findMany({
      where: {
        OR: [
          {
            AND: [
              { firstName: { equals: findDto.name, mode: 'insensitive' } },
              { lastName: { equals: findDto.surname, mode: 'insensitive' } },
            ],
          },
          { email: { equals: findDto.email, mode: 'insensitive' } },
        ],
      },
      orderBy: { applicationDate: 'desc' },
    });
  }
}
