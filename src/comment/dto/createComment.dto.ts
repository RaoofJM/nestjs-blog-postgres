import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsString()
  postId: number;

  @IsString()
  @IsOptional()
  userId: number;
}
