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

@Entity('photo')
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Exclude()
  @Column()
  path: string;

  @Expose()
  get url() {
    return `${configService.getServerUrl()}/photos/${this.filename}`;
  }

  @ManyToOne(
    () => Exam,
    Exam => Exam.photos,
    { nullable: true },
  )
  @JoinColumn()
  exam: Exam;
}
