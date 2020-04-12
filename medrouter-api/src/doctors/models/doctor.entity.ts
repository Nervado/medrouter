import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { User } from '../../users/models/user.entity';

import { Exclude } from 'class-transformer';

import { Specialty } from '../enums/specialty.enum';
import { Appointment } from 'src/appointments/models/appointment.entity';
import { Prescription } from 'src/prescriptions/models/prescription.entity';
import { Schedule } from './schedule.entity';

@Entity('doctor')
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number;

  @Column({ nullable: true })
  hireddate: Date;

  @Column({ nullable: true })
  dismissdate: Date;

  @Column({ nullable: true })
  ishired: boolean;

  @OneToOne(() => User, { eager: true, cascade: true })
  @JoinColumn()
  user: User;

  @Column()
  @Column({
    type: 'enum',
    enum: Specialty,
    default: [Specialty.CMD],
    array: true,
  })
  specialty: Specialty[];

  @OneToMany(
    () => Appointment,
    appointment => appointment.doctor,
  )
  appointment: Appointment[];

  @ManyToOne(() => Schedule)
  schedule: Schedule[];

  @OneToMany(
    () => Prescription,
    prescription => prescription.doctor,
  )
  prescription: Appointment[];

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
