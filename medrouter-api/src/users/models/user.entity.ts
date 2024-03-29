import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import { Avatar } from '../../avatars/models/avatar.entity';
import { Exclude, Expose } from 'class-transformer';

import * as bcrypt from 'bcrypt';

import { Address } from '../../address/models/address.entity';
import { Role } from '../../auth/enums/role.enum';
import { Sex } from '../enuns/sex.enum';
import { Lab } from 'src/labs/models/lab.entity';
import { IsUUID } from 'class-validator';

@Entity('user')
@Unique(['email'])
@Unique(['cpf'])
@Unique(['phoneNumber'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'timestamp', nullable: true })
  birthdate: Date;

  @Column({ type: 'enum', default: Sex.UNDEF, enum: Sex })
  sex: Sex;

  @Column()
  email: string;
  @Column({ type: 'enum', default: [Role.CLIENT], array: true, enum: Role })
  role: Role[];

  @Exclude()
  @Column({ nullable: false, default: false })
  checked: boolean;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @OneToOne(() => Avatar, { eager: true, nullable: true })
  @JoinColumn()
  avatar: Avatar;

  @OneToOne(() => Address, { eager: true, onUpdate: 'CASCADE', nullable: true })
  @JoinColumn()
  address: Address;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @Exclude()
  @ManyToOne(
    type => Lab,
    lab => lab.users,
    { nullable: true },
  )
  lab: Lab;

  @Expose()
  get fullname() {
    return this.username + ' ' + this.surname;
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
