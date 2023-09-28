import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailsSendDto {
  @IsEmail({}, { each: true })
  @ApiProperty()
  emails: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  text: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subject: string;
}
