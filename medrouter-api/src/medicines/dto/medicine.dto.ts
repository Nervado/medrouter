import { IsString, IsNotEmpty } from 'class-validator';

import { MedicineSubcategory, MedicineCategory } from '../enums/category.enum';

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
}
