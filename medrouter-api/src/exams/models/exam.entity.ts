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
import { Exclude } from 'class-transformer';

import { Photo } from 'src/photos/models/photos.entity';
import { Doc } from 'src/docs/models/doc.entity';
import { Lab } from 'src/labs/models/lab.entity';
import { Client } from 'src/client/models/client.entity';
import { Doctor } from 'src/doctors/models/doctor.entity';

@Entity('exam')
export class Exam extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'enum', enum: ExamsEnum, default: ExamsEnum.BLOOD })
  exams: ExamsEnum;

  @Column({ nullable: true })
  deadline: number;

  @ManyToOne(type => Photo)
  photos: Photo[];

  @ManyToOne(type => Doc)
  docs: Doc[];

  // falta medico e paciente relacao many to many

  @OneToOne(() => Lab, { eager: true })
  @JoinColumn()
  lab: Lab;

  @OneToOne(() => Client, { eager: true })
  @JoinColumn()
  client: Client;

  @OneToOne(() => Doctor, { eager: true })
  @JoinColumn()
  doctor: Doctor;

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
