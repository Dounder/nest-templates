import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { UserRoles } from '../../users/enum/UserRoles.enum';
import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (roles: UserRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const user: User = req.user;

    if (!user)
      throw new InternalServerErrorException(
        `No user inside the request, make sure that we used th AuthGuard`,
      );

    if (roles.length === 0) return user;

    if (roles.some((r) => user.roles.includes(r))) return user;

    throw new ForbiddenException(
      `User ${user.username} need a valid role [${roles}]`,
    );
  },
);
