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
} from 'typeorm';
import { User } from 'src/users/models/user.entity';
import { Specialty } from 'src/doctors/enums/specialty.enum';
import { Exclude } from 'class-transformer';

@Entity({ name: 'LabTable' })
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { eager: true, cascade: true })
  @JoinColumn()
  user: User;

  @Column()
  @Column({
    type: 'enum',
    enum: Specialty,
    default: [Specialty.CMD],
    array: true,
  })
  specialty: Specialty[];

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
