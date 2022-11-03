import { User } from './../users/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmation(user: User, token: string) {
    const url = `http://localhost:5173/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      priority: 'high',
      context: {
        name: user.username,
        url,
      },
    });
  }

  async sendPasswordReset(user: User, token: string) {
    const url = `http://localhost:5173/auth/reset_password?id=${user.id}&token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      priority: 'high',
      context: {
        name: user.username,
        url,
      },
    });
  }
}
