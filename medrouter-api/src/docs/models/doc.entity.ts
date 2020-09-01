import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { configService } from 'src/config/config.service';
import { Exclude, Expose } from 'class-transformer';
import { Exam } from 'src/exams/models/exam.entity';

@Entity('documents')
export class Doc extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Exclude()
  @Column()
  path: string;

  @Expose()
  get url() {
    return `${configService.getServerUrl()}/docs/${this.filename}`;
  }

  @ManyToOne(
    () => Exam,
    Exam => Exam.docs,
    { nullable: true },
  )
  @JoinColumn()
  exam: Exam;
}
