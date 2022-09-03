import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Roles } from './../types/roles.enum';

@Schema({
  versionKey: false,
  collection: 'users',
})
export class User extends Document {
  @Prop({ unique: true, index: true })
  username: string;

  @Prop({ unique: true, index: true })
  email: string;

  @Prop({ index: true, select: false })
  password: string;

  @Prop({ enum: Roles, default: [Roles.user], type: Array })
  roles: Roles[];

  @Prop({ default: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
