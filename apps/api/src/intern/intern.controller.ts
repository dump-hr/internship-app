import { SetInterviewRequest } from '@internship-app/types';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

import { CreateInternDto } from './dto/createIntern.dto';
import { InternService } from './intern.service';

@Controller('intern')
@ApiTags('intern')
export class InternController {
  constructor(private readonly internService: InternService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    const interns = await this.internService.getAll();

    return interns;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: string) {
    const intern = await this.internService.get(id);

    if (!intern) {
      throw new NotFoundException();
    }

    return intern;
  }

  @Get('status/:id')
  async getApplicationStatus(@Param('id') id: string) {
    const status = await this.internService.getApplicationStatus(id);

    if (!status) {
      throw new NotFoundException();
    }

    return status;
  }

  @Post()
  async create(@Body() intern: CreateInternDto) {
    const newIntern = await this.internService.create(intern);

    return newIntern;
  }

  @Put('setInterview/:internId')
  async setInterview(
    @Param('internId') internId: string,
    @Body() data: SetInterviewRequest,
  ) {
    return await this.internService.setInterview(internId, data);
  }
}
