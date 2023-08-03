import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @IsString()
  @ApiProperty({ type: String, description: 'content' })
  content: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `tags - example of tags: "first tag,second tag,third tag"`,
  })
  tags: string;
}
