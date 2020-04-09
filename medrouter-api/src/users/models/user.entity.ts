import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Avatar } from '../../avatars/models/avatar.entity';
import { Exclude, Expose } from 'class-transformer';

import * as bcrypt from 'bcrypt';
// import { Budget } from '../../budgets/models/budget.entity';
import { Address } from '../../address/models/address.entity';

@Entity({ name: 'UserTable' })
@Unique(['email'])
@Unique(['cpf'])
@Unique(['phoneNumber'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @Column()
  ispro: boolean;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @OneToOne(() => Avatar, { eager: true })
  @JoinColumn()
  avatar: Avatar;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  adress: Address;

  /**
   *  @OneToMany(
    () => Budget,
    budget => budget.user,
  )
  @JoinColumn()
  budget: Budget[];
   */

  @Expose()
  get fullname() {
    return this.username + ' ' + this.surname;
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
