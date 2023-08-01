import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 10)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 100)
  password: string;
}
