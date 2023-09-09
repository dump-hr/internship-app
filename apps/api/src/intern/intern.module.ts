import { Module } from '@nestjs/common';
import { InternService } from './intern.service';
import { InternController } from './intern.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InternController],
  providers: [InternService, PrismaService],
})
export class InternModule {}
