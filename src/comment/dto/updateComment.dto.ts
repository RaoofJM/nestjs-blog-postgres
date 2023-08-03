import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @ApiProperty({ type: String, description: 'content' })
  content: string;
}
