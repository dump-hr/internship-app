import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { InternDisciplineController } from './intern-discipline.controller';
import { InternDisciplineService } from './intern-discipline.service';

@Module({
  controllers: [InternDisciplineController],
  providers: [InternDisciplineService, PrismaService],
})
export class InternDisciplineModule {}
