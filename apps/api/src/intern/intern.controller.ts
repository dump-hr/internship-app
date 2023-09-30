import {
  BoardActionRequest,
  InternActionRequest,
  InternDecisionRequest,
  SetInterviewRequest,
} from '@internship-app/types';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

import { CreateInternDto } from './dto/createIntern.dto';
import { InternService } from './intern.service';

@Controller('intern')
@ApiTags('intern')
export class InternController {
  constructor(private readonly internService: InternService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    const interns = await this.internService.getAll();

    return interns;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async setInterview(
    @Param('internId') internId: string,
    @Body() data: SetInterviewRequest,
  ) {
    return await this.internService.setInterview(internId, data);
  }

  @Put('setImage/:internId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async setImage(
    @Param('internId') internId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }),
          new MaxFileSizeValidator({ maxSize: 1000 * 1000 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.internService.setImage(internId, file.buffer);
  }

  @Put('action/:internId')
  async applyAction(
    @Param('internId') internId: string,
    @Body() { action }: InternActionRequest,
  ) {
    return await this.internService.applyAction(internId, action);
  }

  @Put('boardAction')
  async applyBoardAction(@Body() { action, internIds }: BoardActionRequest) {
    return await this.internService.applyBoardAction(action, internIds);
  }

  @Put('setDecision/:internId')
  async setDecision(
    @Param('internId') internId: string,
    @Body() data: InternDecisionRequest,
  ) {
    return await this.internService.setDecision(internId, data);
  }
}
