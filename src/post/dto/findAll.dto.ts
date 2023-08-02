import { IsOptional, IsString } from 'class-validator';

export class FindAllPostDto {
  @IsString()
  @IsOptional()
  page: number;

  @IsString()
  @IsOptional()
  limit: number;
}
