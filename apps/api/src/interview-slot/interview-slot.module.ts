import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

import { MicrosoftGraphService } from './graph.service';
import { InterviewSlotController } from './interview-slot.controller';
import { InterviewSlotService } from './interview-slot.service';

@Module({
  imports: [EmailModule],
  controllers: [InterviewSlotController],
  providers: [
    InterviewSlotService,
    LoggerService,
    EmailService,
    MicrosoftGraphService,
    PrismaService,
  ],
})
export class InterviewSlotModule {}
