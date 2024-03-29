import {
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Entity,
} from 'typeorm';
import { Photo } from 'src/photos/models/photos.entity';
import { Exclude } from 'class-transformer/decorators';
import { User } from 'src/users/models/user.entity';
import { Doc } from 'src/docs/models/doc.entity';
import { Appointment } from '../../appointments/models/appointment.entity';
import { Prescription } from 'src/prescriptions/models/prescription.entity';

@Entity('client')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Photo, { eager: true, cascade: true, nullable: true })
  @JoinColumn()
  photo: Photo;

  @OneToOne(() => Doc, { eager: true, cascade: true, nullable: true })
  @JoinColumn()
  doc: Doc;

  @OneToOne(() => User, { eager: true, cascade: true, nullable: true })
  @JoinColumn()
  user: User;

  @OneToMany(
    () => Prescription,
    prescription => prescription.client,
    { nullable: true },
  )
  @JoinColumn()
  prescription: Prescription[];

  @OneToMany(
    () => Appointment,
    appointment => appointment.client,
    { nullable: true },
  )
  @JoinColumn()
  appointments: Appointment[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
