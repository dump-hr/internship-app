import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/azure.guard';

import { UpdateStatusDto } from './dto/updateStatus.dto';
import { InternshipApplicationStatusService } from './internship-application-status.service';

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
  update(@Body() data: UpdateStatusDto) {
    return this.internshipApplicationStatusService.update(data.isOpened);
  }
}
