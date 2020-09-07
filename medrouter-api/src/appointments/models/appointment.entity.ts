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
import { Available } from 'src/doctors/enums/available.enum';

@Entity('appointment')
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  date: Date;

  @IsNotEmpty()
  @Column()
  hour: Available;

  @IsNotEmpty()
  @Column({
    type: 'enum',
    default: AppointmentStatus.REQUESTED,
    enum: AppointmentStatus,
  })
  status: AppointmentStatus;

  @ManyToOne(
    () => Client,
    client => client.appointments,
  )
  @JoinColumn()
  client: Client;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 200,
  })
  price: number;

  @ManyToOne(
    () => Doctor,
    doctor => doctor.appointments,
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
