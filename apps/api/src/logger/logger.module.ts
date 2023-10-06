import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';

@Module({
  controllers: [LoggerController],
  providers: [LoggerService, PrismaService],
})
export class LoggerModule {}
