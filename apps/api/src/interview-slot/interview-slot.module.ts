import { Module } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

import { InterviewSlotController } from './interview-slot.controller';
import { InterviewSlotService } from './interview-slot.service';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';
import { GraphService } from './graph.service';

@Module({
  imports: [EmailModule],
  controllers: [InterviewSlotController],
  providers: [
    InterviewSlotService,
    LoggerService,
    EmailService,
    GraphService,
    PrismaService,
  ],
})
export class InterviewSlotModule {}
