import { PartialType } from '@nestjs/swagger';
import { CreateInterviewQuestionDto } from './create-interview.dto';

export class UpdateInterviewDto extends PartialType(
  CreateInterviewQuestionDto,
) {}
