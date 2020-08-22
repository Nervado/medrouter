import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

import { MedicineSubcategory, MedicineCategory } from '../enums/category.enum';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export class MedicineDto {
  @IsOptional()
  @IsString()
  presentantion: string;

  @IsOptional()
  @IsString()
  product_type?: string;

  @IsOptional()
  @IsString()
  therapeutic_class?: string;

  @IsOptional()
  @IsString()
  cnpj: string;

  @IsOptional()
  @IsUUID()
  prescriptionId: string;

  @IsOptional()
  @IsString()
  genericname: string;

  @IsString()
  @IsNotEmpty()
  substance: string;

  @IsOptional()
  @IsString()
  branch: string;

  @IsString()
  @IsNotEmpty()
  laboratory: string;

  @IsString()
  @IsNotEmpty()
  product?: string;

  @IsOptional()
  @IsString()
  stripe?: string;

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
