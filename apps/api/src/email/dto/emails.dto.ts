import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailsDto {
  @IsEmail({}, { each: true })
  @ApiProperty()
  emails: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  text: string;
}
