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

import { User } from '../../users/models/user.entity';
import { Receptionist } from '../../receptionist/models/receptionist.entity';
import { Exclude } from 'class-transformer';

@Entity('manager')
export class Manager extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number;

  @Column({ nullable: true })
  hireddate: Date;

  @Column({ nullable: true })
  dismissdate: Date;

  @Column({ nullable: true })
  ishired: boolean;

  @OneToOne(type => User, { eager: true, cascade: true })
  @JoinColumn()
  user: User;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
