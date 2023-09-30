import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { TestSlotController } from './test-slot.controller';
import { TestSlotService } from './test-slot.service';

@Module({
  controllers: [TestSlotController],
  providers: [TestSlotService, PrismaService],
})
export class TestSlotModule {}
