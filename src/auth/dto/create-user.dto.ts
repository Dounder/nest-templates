import {
  IsArray,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Roles } from './../types/roles.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsOptional()
  @IsArray()
  @IsIn(Object.values(Roles))
  roles?: Roles[];
}
