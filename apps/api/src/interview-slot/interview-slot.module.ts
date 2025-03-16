import { Module } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

import { InterviewSlotController } from './interview-slot.controller';
import { InterviewSlotService } from './interview-slot.service';

@Module({
  controllers: [InterviewSlotController],
  providers: [InterviewSlotService, LoggerService, PrismaService],
  exports: [InterviewSlotService],
})
export class InterviewSlotModule {}
