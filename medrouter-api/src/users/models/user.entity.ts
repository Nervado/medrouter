import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Avatar } from '../../avatars/models/avatar.entity';
import { Exclude, Expose } from 'class-transformer';

import * as bcrypt from 'bcrypt';
// import { Budget } from '../../budgets/models/budget.entity';
import { Address } from '../../address/models/address.entity';
import { Doc } from '../../docs/models/doc.entity';

import { Role } from '../../auth/enums/role.enum';

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
  admin: boolean; // manager

  @Column()
  recept: boolean; // receptionist

  @Column()
  doctor: boolean; // doctors

  @Column()
  client: boolean; //pacients

  @Column()
  owner: boolean; // owner

  @Column({ type: 'enum', enum: Role, default: [Role.CLIENT], array: true })
  role: Role[];

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @OneToOne(() => Avatar, { eager: true })
  @JoinColumn()
  avatar: Avatar;

  @OneToMany(
    () => Doc,
    doc => doc.user,
  )
  @JoinColumn()
  doc: Doc[];

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @Expose()
  get fullname() {
    return this.username + ' ' + this.surname;
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
