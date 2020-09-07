import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Available } from '../enums/available.enum';
import { Doctor } from './doctor.entity';
import { Appointment } from 'src/appointments/models/appointment.entity';
@Entity('schedule')
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    default: [
      Available.H09,
      Available.H10,
      Available.H11,
      Available.H14,
      Available.H15,
      Available.H16,
    ],
    enum: Available,
    array: true,
  })
  availablehours: Available[];

  @ManyToOne(
    type => Doctor,
    doctor => doctor.schedules,
    { nullable: true },
  )
  doctor: Doctor;
}
