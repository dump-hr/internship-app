import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InternshipApplicationStatusService } from './internship-application-status.service';
import { AdminGuard } from 'src/auth/azure.guard';

@Controller('internship-application-status')
@ApiTags('internship-application-status')
export class InternshipApplicationController {
  constructor(
    private readonly internshipApplicationStatusService: InternshipApplicationStatusService,
  ) {}

  @Get('/isOpened')
  findOne() {
    return this.internshipApplicationStatusService.findFirst();
  }

  @UseGuards(AdminGuard)
  @Patch('/update')
  update(@Body() isOpened: { isOpened: boolean }) {
    return this.internshipApplicationStatusService.update(isOpened.isOpened);
  }
}
