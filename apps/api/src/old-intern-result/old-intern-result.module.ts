import { Module } from '@nestjs/common';
import { OldInternResultService } from './old-intern-result.service';
import { OldInternResultController } from './old-intern-result.controller';

@Module({
  controllers: [OldInternResultController],
  providers: [OldInternResultService]
})
export class OldInternResultModule {}
