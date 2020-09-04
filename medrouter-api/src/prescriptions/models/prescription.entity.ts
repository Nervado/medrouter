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
  Column,
  OneToMany,
  Generated,
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
    { eager: true, cascade: true },
  )
  @JoinColumn()
  client: Client;

  @ManyToOne(
    type => Doctor,
    doctor => doctor.prescriptions,
    { eager: true, cascade: true },
  )
  @JoinColumn()
  doctor: Doctor;

  @Column('text', { nullable: true, array: true })
  recomendations: string[];

  @Generated('increment')
  @Column()
  code: number;

  @Column({ nullable: true })
  waist: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  bpm: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  pressure: string;

  @OneToMany(
    type => Medicine,
    medicine => medicine.prescription,
    { eager: true, cascade: true },
  )
  @JoinTable()
  medicines: Medicine[];

  @OneToMany(
    type => Exam,
    exam => exam.prescription,
    { eager: true, cascade: true },
  )
  @JoinTable()
  exams: Exam[];

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
