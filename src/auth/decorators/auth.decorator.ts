import { applyDecorators, UseGuards } from '@nestjs/common';

import { UserRoles } from './../../users/enum/UserRoles.enum';
import { JwtGraphqlGuard } from './../guards/jwt-graphql.guard';
import { UserRoleGuard } from './../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(JwtGraphqlGuard, UserRoleGuard),
  );
}
