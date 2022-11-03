import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './../users/entities/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { LoginDto, SignupDto } from './dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthResponse } from './interfaces';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return await this.authService.login(loginDto);
  }

  @Post('sign_up')
  async signup(@Body() signupDto: SignupDto): Promise<AuthResponse> {
    return await this.authService.signup(signupDto);
  }

  @Post('reset_password/:email')
  async sendResetPasswordMail(@Param('email') email: string): Promise<boolean> {
    return await this.authService.sendResetPasswordMail(email);
  }

  @Post('reset_password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<boolean> {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Get('refresh_token')
  @UseGuards(AuthGuard())
  async refresh(@GetUser() user: User): Promise<AuthResponse> {
    return await this.authService.refresh(user);
  }
}
