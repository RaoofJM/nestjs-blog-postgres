import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindAllPostDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'page - default: 1' })
  page?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'limit - default: 5' })
  limit?: number;
}
