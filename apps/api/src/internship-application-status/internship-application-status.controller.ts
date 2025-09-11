import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InternshipApplicationStatusService } from './internship-application-status.service';

@Controller('internship-application')
@ApiTags('internship-application')
export class InternshipApplicationController {
  constructor(
    private readonly internshipApplicationStatusService: InternshipApplicationStatusService,
  ) {}

  @Get('/isOpened')
  findOne() {
    return this.internshipApplicationStatusService.findFirst();
  }

  @Patch('/isOpened')
  update(@Body() isOpened: boolean) {
    return this.internshipApplicationStatusService.update(isOpened);
  }
}
