import { PrismaService } from 'src/prisma.service';
import { FindDto } from './dto/find.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OldInternResultService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(findDto: FindDto) {
    return this.prisma.oldInternResult.findFirst({
      where: {
        OR: [
          {
            AND: [{ first_name: findDto.name }, { last_name: findDto.surname }],
          },
          { email: findDto.email },
        ],
      },
    });
  }
}
