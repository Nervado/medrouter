import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/users/models/user.entity';
import { Exclude } from 'class-transformer';
import { LabCategory } from '../enums/category.enum';

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

  @OneToOne(() => User, { eager: true, cascade: true })
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: LabCategory,
    default: [LabCategory.LABEXM],
    array: true,
  })
  labcategory: LabCategory[];

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
