import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { InternController } from './intern.controller';
import { InternService } from './intern.service';

@Module({
  controllers: [InternController],
  providers: [InternService, PrismaService],
})
export class InternModule {}
