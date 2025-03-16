import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  question: string;
}
