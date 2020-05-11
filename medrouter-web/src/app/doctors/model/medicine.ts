import { MedicineSubcategory, MedicineCategory } from "../enums/medicines.enum";

export class Medicine {
  genericname: string;
  substancy: string;
  branch: string;
  laboratoryname: string;
  subcategory: MedicineSubcategory;
  category: MedicineCategory;
}
