import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { InternDisciplineService } from './intern-discipline.service';

@Controller('intern-discipline')
@ApiTags('intern-discipline')
export class InternDisciplineController {
  constructor(
    private readonly internDisciplineService: InternDisciplineService,
  ) {}

  @Get()
  async getAll() {
    const disciplines = await this.internDisciplineService.getAll();
    return disciplines;
  }

  @Get(':internId')
  async getInternDiscipline(@Param('internId') internId: string) {
    const discipline = await this.internDisciplineService.getInternDiscipline(
      internId,
    );
    return discipline;
  }
}
