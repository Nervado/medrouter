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
import { scheduled } from 'rxjs';

@Entity('doctor')
export class Doctor extends BaseEntity {
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
  appointments: Appointment[];

  @OneToMany(
    type => Schedule,
    schedule => schedule.doctor,
    { cascade: true, nullable: true },
  )
  schedules: Schedule[];

  @OneToMany(
    () => Prescription,
    prescription => prescription.doctor,
  )
  prescriptions: Prescription[];

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
