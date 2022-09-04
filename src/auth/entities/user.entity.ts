import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from './../types/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  username: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('enum', { array: true, enum: Roles, default: [Roles.user] })
  roles: Roles[];

  @Column('bool', { default: true })
  active: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.email = this.email.toLowerCase().trim();
  }
}
