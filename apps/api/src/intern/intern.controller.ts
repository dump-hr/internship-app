import {
  BoardActionRequest,
  CreateNoteRequest,
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
import { AdminLogAction, InternLogAction } from '@prisma/client';
import { MemberGuard } from 'src/auth/admin.guard';
import { LoggerService } from 'src/logger/logger.service';

import { CreateInternDto } from './dto/createIntern.dto';
import { InternService } from './intern.service';

@Controller('intern')
@ApiTags('intern')
export class InternController {
  constructor(
    private readonly internService: InternService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  @UseGuards(MemberGuard)
  async getAll() {
    const interns = await this.internService.getAll();

    return interns;
  }

  @Get('count')
  async count() {
    return await this.internService.count();
  }

  @Get(':id')
  @UseGuards(MemberGuard)
  async get(@Param('id') id: string) {
    const intern = await this.internService.get(id);

    if (!intern) {
      throw new NotFoundException();
    }

    return intern;
  }

  @Get('status/:id')
  async getApplicationStatus(@Param('id') id: string) {
    await this.loggerService.createInternLog(
      id,
      InternLogAction.OpenStatusPage,
    );

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
  @UseGuards(MemberGuard)
  async setInterview(
    @Param('internId') internId: string,
    @Body() data: SetInterviewRequest,
  ) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Update,
      `Intervjuiranje ${internId}`,
    );

    return await this.internService.setInterview(internId, data);
  }

  @Put('setImage/:internId')
  @UseGuards(MemberGuard)
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
    await this.loggerService.createAdminLog(
      AdminLogAction.Update,
      `Stavljanje slike ${internId}`,
    );

    return await this.internService.setImage(internId, file.buffer);
  }

  @Put('action/:internId')
  @UseGuards(MemberGuard)
  async applyAction(
    @Param('internId') internId: string,
    @Body() { action }: InternActionRequest,
  ) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Update,
      `Akcija nad pripravnikom ${internId} : ${JSON.stringify(action)}`,
    );

    return await this.internService.applyAction(internId, action);
  }

  @Put('boardAction')
  @UseGuards(MemberGuard)
  async applyBoardAction(@Body() { action, internIds }: BoardActionRequest) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Update,
      `Bulk update nad ${JSON.stringify(internIds)} : ${JSON.stringify(
        action,
      )}`,
    );

    return await this.internService.applyBoardAction(action, internIds);
  }

  @Put('setDecision/:internId')
  @UseGuards(MemberGuard)
  async setDecision(
    @Param('internId') internId: string,
    @Body() data: InternDecisionRequest,
  ) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Update,
      `Odluka o članstvu nad ${internId}`,
    );

    return await this.internService.setDecision(internId, data);
  }

  @Post('note/:internId')
  @UseGuards(MemberGuard)
  async setNote(
    @Param('internId') internId: string,
    @Body() data: CreateNoteRequest,
  ) {
    await this.loggerService.createAdminLog(
      AdminLogAction.Create,
      `Dodana nota nad ${internId}`,
    );

    return await this.internService.createNote(internId, data);
  }
}
