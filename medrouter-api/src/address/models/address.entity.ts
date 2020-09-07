import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('address')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cep: string;

  @Column()
  streetName: string;

  @Column()
  houseNumber: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  fu: string;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
