import { Token } from './entities/token.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from './../mail/mail.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { LoginDto, SignupDto } from './dto';
import { AuthResponse } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
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

    const token = bcrypt.hashSync(crypto.randomBytes(32).toString('hex'), 10);
    await this.mailService.sendConfirmation(user, token);

    return { user, token: this.getJwtToken(user.id) };
  }

  async refresh(user: User): Promise<AuthResponse> {
    return { user: user, token: this.getJwtToken(user.id) };
  }

  async sendResetPasswordMail(email: string): Promise<boolean> {
    const user = await this.usersService.findOneByTerm(email);

    let token = await this.tokenRepository.findOneBy({ user: { id: user.id } });

    if (token) await this.tokenRepository.remove(token);

    token = await this.tokenRepository.save({
      user,
      token: crypto.randomBytes(32).toString('hex'),
    });

    await this.mailService.sendPasswordReset(user, token.token);

    return true;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    const { id, token, password } = resetPasswordDto;
    const user = await this.usersService.findOneByTerm(id);

    const tokenDb = await this.tokenRepository.findOneBy({
      user: { id: user.id },
      token,
    });

    if (!tokenDb) throw new BadRequestException('Invalid link or expired');

    await this.usersService.update(id, { id, password });
    await this.tokenRepository.remove(tokenDb);

    return true;
  }

  private getJwtToken(id: string) {
    return this.jwtService.sign({ id });
  }
}
