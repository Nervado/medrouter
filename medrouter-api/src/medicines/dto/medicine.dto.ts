import { IsString, IsNotEmpty } from 'class-validator';

import { MedicineSubcategory, MedicineCategory } from '../enums/category.enum';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export class MedicineDto {
  @IsString()
  @IsNotEmpty()
  genericname: string;

  @IsString()
  @IsNotEmpty()
  substancy: string;

  @IsString()
  @IsNotEmpty()
  branch: string;

  @IsString()
  @IsNotEmpty()
  laboratoryname: string;

  @IsNotEmpty()
  @IsString()
  subcategory: MedicineSubcategory;

  @IsNotEmpty()
  @IsString()
  category: MedicineCategory;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
