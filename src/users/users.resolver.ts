import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Auth, GetUser } from './../auth/decorators';
import { JwtGraphqlGuard } from './../auth/guards/jwt-graphql.guard';
import { PaginationArgs, SearchArgs } from './../common/dto/args';
import { UpdateUserInput, RoleArg } from './dto';
import { User } from './entities/user.entity';
import { UserRoles } from './enum/UserRoles.enum';
import { UsersService } from './users.service';

@Resolver(() => User)
@UseGuards(JwtGraphqlGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @Auth(UserRoles.admin)
  async findAll(
    @Args() validRoles: RoleArg,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<User[]> {
    return await this.usersService.findAll(
      validRoles.roles,
      paginationArgs,
      searchArgs,
    );
  }

  @Query(() => User, { name: 'user' })
  @Auth(UserRoles.admin)
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<User> {
    return await this.usersService.findOneByTerm(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @GetUser([UserRoles.admin]) user: User,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput, user);
  }

  @Mutation(() => User)
  @Auth(UserRoles.admin)
  async removeUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<User> {
    return await this.usersService.remove(id);
  }
}
