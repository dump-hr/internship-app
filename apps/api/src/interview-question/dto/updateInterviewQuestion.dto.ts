import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateInterviewQuestionDto {
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  question: string;
}
