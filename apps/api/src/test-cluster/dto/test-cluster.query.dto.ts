import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class TestClusterQuery {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    required: false,
  })
  testQuestionId?: string;
}
