import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  tags: string;

  @IsString()
  @IsOptional()
  userId: number;
}
