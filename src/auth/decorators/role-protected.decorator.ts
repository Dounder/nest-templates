import { UserRoles } from './../../users/enum/UserRoles.enum';
import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: UserRoles[]) =>
  SetMetadata(META_ROLES, args);
