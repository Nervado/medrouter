import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Medicine } from '../../medicines/models/medicine.entity';
import { Exam } from 'src/exams/models/exam.entity';
import { Client } from 'src/client/models/client.entity';
import { Doctor } from 'src/doctors/models/doctor.entity';
@Entity('prescription')
export class Prescription extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Client,
    client => client.prescription,
  )
  @JoinColumn()
  client: Client;

  @ManyToOne(
    () => Doctor,
    doctor => doctor.prescription,
  )
  @JoinColumn()
  doctor: Doctor;

  @ManyToMany(type => Medicine)
  @JoinTable()
  medicine: Medicine[];

  @ManyToOne(type => Exam)
  exam: Exam[];

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
