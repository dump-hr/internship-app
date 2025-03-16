import { PartialType } from '@nestjs/swagger';
import { CreateInterviewQuestionDto } from './create-interview-question.dto';

export class UpdateInterviewQuestionDto extends PartialType(CreateInterviewQuestionDto) {}
