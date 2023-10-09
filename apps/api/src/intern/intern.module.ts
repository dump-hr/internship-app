import { Module } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

import { InternController } from './intern.controller';
import { InternService } from './intern.service';

@Module({
  controllers: [InternController],
  providers: [InternService, LoggerService, PrismaService],
})
export class InternModule {}
