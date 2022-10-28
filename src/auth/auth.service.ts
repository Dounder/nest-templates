import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { LoginDto, SignupDto } from './dto';
import { AuthResponse } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { password, username } = loginDto;
    const user = await this.usersService.findOneByTerm(username);

    if (user.deletedAt)
      throw new ForbiddenException(`User is inactive talk with admin`);

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(
        `User credentials are not valid ( username / password )`,
      );

    return { user, token: this.getJwtToken(user.id) };
  }

  async signup(signupDto: SignupDto): Promise<AuthResponse> {
    const user = await this.usersService.create(signupDto);

    return { user, token: this.getJwtToken(user.id) };
  }

  async refresh(user: User): Promise<AuthResponse> {
    return { user: user, token: this.getJwtToken(user.id) };
  }

  private getJwtToken(id: string) {
    return this.jwtService.sign({ id });
  }
}
