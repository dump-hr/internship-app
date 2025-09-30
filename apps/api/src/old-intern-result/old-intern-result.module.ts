import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { OldInternResultController } from './old-intern-result.controller';
import { OldInternResultService } from './old-intern-result.service';

@Module({
  controllers: [OldInternResultController],
  providers: [OldInternResultService, PrismaService],
})
export class OldInternResultModule {}
