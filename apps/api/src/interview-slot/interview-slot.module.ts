import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { InterviewSlotController } from './interview-slot.controller';
import { InterviewSlotService } from './interview-slot.service';

@Module({
  controllers: [InterviewSlotController],
  providers: [InterviewSlotService, PrismaService],
})
export class InterviewSlotModule {}
