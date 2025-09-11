import { Module } from '@nestjs/common';
import { InternshipApplicationStatusService } from './internship-application-status.service';
import { InternshipApplicationController } from './internship-application-status.controller';

@Module({
  controllers: [InternshipApplicationController],
  providers: [InternshipApplicationStatusService],
})
export class InternshipApplicationStatusModule {}
