import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('refresh-token')
  @Auth()
  refreshToken(@GetUser() user: User) {
    return this.authService.refreshToken(user);
  }
}
