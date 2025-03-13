import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InterviewQuestionsService } from './interview-questions.service';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { UpdateInterviewQuestionDto } from './dto/update-interview-question.dto';
import { QuestionCategory, QuestionType } from '@prisma/client';

@ApiTags('interview-questions')
@Controller('interview-questions')
export class InterviewQuestionsController {
  constructor(
    private readonly interviewQuestionsService: InterviewQuestionsService,
  ) {}

  @Post()
  create(@Body() createInterviewQuestionDto: CreateInterviewQuestionDto) {
    return this.interviewQuestionsService.create(createInterviewQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all interview questions with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated interview questions',
  })
  findAll(
    @Query()
    query: {
      page: string;
      limit: string;
      type?: QuestionType;
      category?: QuestionCategory;
    },
  ) {
    return this.interviewQuestionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewQuestionsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterviewQuestionDto: UpdateInterviewQuestionDto,
  ) {
    return this.interviewQuestionsService.update(
      id,
      updateInterviewQuestionDto,
    );
  }
}
