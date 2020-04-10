import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import { User } from '../../users/models/user.entity';
import { Manager } from '../../manager/models/manager.entity';

@Entity({ name: 'ReceptionistTable' })
export class Receptionist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ishired: boolean;

  @Column({ nullable: true })
  hireddate: Date;

  @Column({ nullable: true })
  dissmisdate: Date;

  @Column({ nullable: true })
  salary: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(
    type => Manager,
    manager => manager.receptionist,
  )
  @JoinColumn()
  manager: Manager;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
