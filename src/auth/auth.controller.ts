import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from 'src/guard/localAuth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guard/jwtAuth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.authService.create(body);
    return user;
  }

  @Get('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() body: LoginDto, @Request() req) {
    return {
      token: this.jwtService.sign({
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      }),
    };
  }

  @Roles('USER')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/profile')
  async profile(@Request() req) {
    return req.user;
  }
}
