import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { UserRepository } from '../user/user.repository';
import { LoginDto } from './DTO/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDto) {
    const isEmailTaken = await this.userRepository.findByEmail(data.email);
    if (isEmailTaken) throw new BadRequestException('Email is taken');

    const user = await this.userRepository.create(data);
    delete user.password;
    delete user.updatedAt;
    delete user.createdAt;
    delete user.role;

    return user;
  }

  async validateUser(data: LoginDto) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new BadRequestException('Email not valid');

    const passwordCheck = await compare(data.password, user.password);
    if (!passwordCheck) throw new UnauthorizedException('Wrong password');

    return user;
  }
}
