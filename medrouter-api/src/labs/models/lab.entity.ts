import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/models/user.entity';
import { Exclude } from 'class-transformer';
import { LabCategory } from '../enums/category.enum';
import { ExamsEnum } from 'src/exams/enums/exams.enum';

@Entity('lab')
@Unique(['cnpj'])
@Unique(['name'])
export class Lab extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cnpj: string;

  @Column()
  name: string;

  @Column({ default: true })
  available: boolean;

  @OneToMany(
    type => User,
    user => user.lab,
    { eager: true, cascade: true, nullable: true },
  )
  users: User[];

  @Column({
    type: 'enum',
    enum: LabCategory,
    default: [LabCategory.LABEXM],
    array: true,
  })
  labcategory: LabCategory[];

  @Column({
    type: 'enum',
    enum: ExamsEnum,
    default: [ExamsEnum.ABREU],
    array: true,
  })
  exams: ExamsEnum[];

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
