import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @ApiProperty({ type: String, description: 'content' })
  content: string;

  @IsString()
  @ApiProperty({ type: Number, description: 'postId' })
  postId: number;

  @IsString()
  @IsOptional()
  userId: number;
}
