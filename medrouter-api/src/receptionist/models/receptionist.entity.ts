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

import { Exclude } from 'class-transformer';

import { User } from '../../users/models/user.entity';
import { Manager } from '../../manager/models/manager.entity';

@Entity({ name: 'Receptionist' })
export class Receptionist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  ishired: boolean;

  @Column({ nullable: true })
  hireddate: Date;

  @Column({ nullable: true })
  dismissdate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number;

  @OneToOne(type => User, { eager: true, cascade: true })
  @JoinColumn()
  user: User;

  @ManyToOne(
    () => Manager,
    manager => manager.receptionist,
  )
  @JoinColumn()
  manager: Manager;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
