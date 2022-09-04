import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { META_ROLES } from './../decorators/role-protected.decorator';
import { User } from './../entities/user.entity';
import { Roles } from './../types/roles.enum';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Extract roles of metadata
    const validRoles: Roles[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    // If the request doesn't have roles, it means that it is
    // an endpoint that any logged in user can use
    if (!validRoles || validRoles.length === 0) return true;

    // Get logged in user of the request
    const user: User = context.switchToHttp().getRequest().user;

    // If the request doesn't have user throw exception
    if (!user) throw new BadRequestException('User not found ( request )');

    // Validation that the logged in user has valid roles assigned
    if (
      Object.values(validRoles).some((roles) => user.roles.indexOf(roles) >= 0)
    )
      return true;

    // Throw an exception if logged in user doesn't have valid role assigned
    throw new ForbiddenException(
      `User ${user.username} need a valid role: [ ${validRoles.join(', ')} ]`,
    );
  }
}
