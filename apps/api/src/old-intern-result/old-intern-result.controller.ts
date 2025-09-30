import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindDto } from './dto/find.dto';
import { OldInternResultService } from './old-intern-result.service';

@Controller('old-intern-result')
@ApiTags('old-intern-result')
export class OldInternResultController {
  constructor(
    private readonly oldInternResultService: OldInternResultService,
  ) {}

  @Get()
  findOne(@Query() findDto: FindDto) {
    return this.oldInternResultService.findOne(findDto);
  }
}
