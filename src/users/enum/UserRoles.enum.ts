import { registerEnumType } from '@nestjs/graphql';

export enum UserRoles {
  admin = 'admin',
  user = 'user',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
  description: 'Valid roles for users',
});
