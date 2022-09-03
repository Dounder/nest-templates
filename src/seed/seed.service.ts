import { Injectable } from '@nestjs/common';

import { AuthService } from './../auth/auth.service';
import { users } from './data/user.data';

@Injectable()
export class SeedService {
  constructor(private readonly authService: AuthService) {}

  runSeed() {
    this.authService.insertUserSeed(users);
  }
}
