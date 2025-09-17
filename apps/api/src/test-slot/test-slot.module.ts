import { Module } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

import { TestSlotController } from './test-slot.controller';
import { TestSlotService } from './test-slot.service';

@Module({
  controllers: [TestSlotController],
  providers: [TestSlotService, LoggerService, PrismaService, EmailService],
})
export class TestSlotModule {}
