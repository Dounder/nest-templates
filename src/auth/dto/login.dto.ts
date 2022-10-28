import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  // @IsEmail()
  // email: string;

  @IsNotEmpty()
  password: string;
}
