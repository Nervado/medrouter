import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { ExamsEnum } from '../enums/exams.enum';
import { ExamStatus } from '../enums/status.enum';
import { Exclude } from 'class-transformer';

import { Photo } from 'src/photos/models/photos.entity';
import { Doc } from 'src/docs/models/doc.entity';
import { Lab } from 'src/labs/models/lab.entity';
import { Client } from 'src/client/models/client.entity';
import { Doctor } from 'src/doctors/models/doctor.entity';
import { Prescription } from 'src/prescriptions/models/prescription.entity';

@Entity('exam')
export class Exam extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({
    type: 'enum',
    enum: ExamsEnum,
  })
  type: ExamsEnum;

  @Column({ type: 'enum', enum: ExamStatus, default: ExamStatus.REQUEST })
  status: ExamStatus;

  @Column({ nullable: true })
  deadline: number;

  @ManyToOne(type => Photo, { nullable: true })
  photos: Photo[];

  @ManyToOne(type => Doc, { nullable: true })
  docs: Doc[];

  @OneToOne(() => Lab, { nullable: true })
  @JoinColumn()
  lab: Lab;

  @ManyToOne(() => Client)
  @JoinColumn()
  client: Client;

  @ManyToOne(() => Doctor)
  @JoinColumn()
  doctor: Doctor;

  @ManyToOne(
    type => Prescription,
    prescription => prescription.exams,
  )
  @JoinColumn()
  prescription: Prescription;

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
