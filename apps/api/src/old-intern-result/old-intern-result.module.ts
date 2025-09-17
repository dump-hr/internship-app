import { Module } from '@nestjs/common';
import { OldInternResultService } from './old-intern-result.service';
import { OldInternResultController } from './old-intern-result.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OldInternResultController],
  providers: [OldInternResultService, PrismaService],
})
export class OldInternResultModule {}
