import { User } from './../../users/entities/user.entity';

export interface AuthResponse {
  token: string;
  user: User;
}
