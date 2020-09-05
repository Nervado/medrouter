import { MedicineCategory, MedicineSubcategory } from "./medicines.enum";

export class Medicine {
  id?: string;
  cnpj?: string;
  prescriptionId?: string;
  genericname?: string;
  substance?: string;
  branch?: string;
  laboratory: string;
  subcategory: MedicineSubcategory;
  category: MedicineCategory;
  product?: string;
  stripe?: string;
  presentantion?: string;
  product_type?: string;
  therapeutic_class?: string;
  formula?: string;
  createdAt?: Date;
}
