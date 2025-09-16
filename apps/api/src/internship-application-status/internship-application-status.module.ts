import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { InternshipApplicationController } from './internship-application-status.controller';
import { InternshipApplicationStatusService } from './internship-application-status.service';

@Module({
  controllers: [InternshipApplicationController],
  providers: [InternshipApplicationStatusService, PrismaService],
})
export class InternshipApplicationStatusModule {}
