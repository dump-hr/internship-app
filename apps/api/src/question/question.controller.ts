import { Controller, Get, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';

@ApiTags()
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAll() {
    return this.questionService.getAll();
  }
}
