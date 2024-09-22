import { Controller, Get, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';
import { MemberGuard } from 'src/auth/admin.guard';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(MemberGuard)
  @Get()
  async getAll() {
    return this.questionService.getAll();
  }
}
