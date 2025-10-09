import { Module } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

import { TestSlotController } from './test-slot.controller';
import { TestSlotService } from './test-slot.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [TestSlotController],
  providers: [TestSlotService, LoggerService, PrismaService],
  imports: [EmailModule],
})
export class TestSlotModule {}
