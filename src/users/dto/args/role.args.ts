import { UserRoles } from './../../enum/UserRoles.enum';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class RoleArg {
  @Field(() => [UserRoles], { nullable: true })
  @IsArray()
  roles: UserRoles[] = [];
}
