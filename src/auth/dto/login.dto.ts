import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
