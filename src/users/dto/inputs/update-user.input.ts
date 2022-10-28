import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsArray, IsDate, IsOptional, IsUUID } from 'class-validator';

import { UserRoles } from './../../enum/UserRoles.enum';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => [UserRoles], { nullable: true })
  @IsArray()
  @IsOptional()
  roles?: UserRoles[];

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
