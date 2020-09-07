import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { MedicineSubcategory, MedicineCategory } from '../enums/category.enum';
import { Exclude } from 'class-transformer';
import { Prescription } from 'src/prescriptions/models/prescription.entity';

@Entity('medicine')
export class Medicine extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  genericname: string;

  @Column({ nullable: true })
  cnpj: string;

  @Column({ nullable: true })
  substance: string;

  @Column({ nullable: true })
  therapeutic_class: string;

  @Column({ nullable: true })
  laboratory: string;

  @Column({ nullable: true })
  product: string;

  @Column({ nullable: true })
  product_type: string;

  @Column({ nullable: true })
  stripe: string;

  @Column({ nullable: true })
  presentantion: string;

  @Column({ nullable: true })
  formula: string;

  @Column({
    type: 'enum',
    default: MedicineSubcategory.GEN,
    enum: MedicineSubcategory,
  })
  subcategory: MedicineSubcategory;

  @Column({
    type: 'enum',
    default: MedicineCategory.NONCONTROLED,
    enum: MedicineCategory,
  })
  category: MedicineCategory;

  @ManyToOne(
    type => Prescription,
    prescription => prescription.medicines,
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
