import { Module } from '@nestjs/common';
import { InternshipApplicationStatusService } from './internship-application-status.service';
import { InternshipApplicationController } from './internship-application-status.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InternshipApplicationController],
  providers: [InternshipApplicationStatusService, PrismaService],
})
export class InternshipApplicationStatusModule {}
