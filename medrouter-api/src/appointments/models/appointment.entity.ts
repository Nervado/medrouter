import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AppointmentStatus } from '../enums/appointment.enum';
import { Client } from 'src/client/models/client.entity';
import { Doctor } from 'src/doctors/models/doctor.entity';

@Entity('appointment')
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  date: Date;

  @IsNotEmpty()
  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.REQUESTED,
  })
  status: AppointmentStatus;

  @ManyToOne(
    () => Client,
    client => client.appointment,
  )
  @JoinColumn()
  client: Client;

  @ManyToOne(
    () => Doctor,
    doctor => doctor.appointment,
  )
  @JoinColumn()
  doctor: Doctor;

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
