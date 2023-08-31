import { Module } from '@nestjs/common';
import { InternService } from './intern.service';
import { PrismaService } from 'src/prisma.service';
import { InternController } from './intern.controller';

@Module({
  controllers: [InternController],
  providers: [InternService, PrismaService]
})
export class InternModule {}
