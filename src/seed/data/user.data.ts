import { Roles } from './../../auth/types/roles.enum';
import * as bcrypt from 'bcrypt';

interface User {
  username: string;
  email: string;
  password: string;
  roles: Roles[];
  active: boolean;
}

export const users: User[] = [
  {
    username: 'dcode',
    email: 'dcode@email.com',
    password: bcrypt.hashSync('Aa1234!', 10),
    roles: [Roles.admin, Roles.user],
    active: true,
  },
];
