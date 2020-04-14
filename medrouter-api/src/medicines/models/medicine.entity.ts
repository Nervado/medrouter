import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
  Entity,
} from 'typeorm';
import { MedicineSubcategory, MedicineCategory } from '../enums/category.enum';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Entity('medicine')
export class Medicine extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  genericname: string;

  @Column()
  substancy: string;

  @Column()
  branch: string;

  @Column()
  laboratoryname: string;

  @Column()
  editorid: string;

  @Column({
    type: 'enum',
    enum: MedicineSubcategory,
    default: MedicineSubcategory.GEN,
  })
  subcategory: MedicineSubcategory;

  @Column({
    type: 'enum',
    enum: MedicineCategory,
    default: MedicineCategory.NONCONTROLED,
  })
  category: MedicineCategory;

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
