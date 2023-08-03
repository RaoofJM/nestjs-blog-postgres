import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 10)
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @Length(1, 100)
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
