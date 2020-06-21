export class LabDto {
  name: string;
  id: string;
  cnpj: string;
  exams: string[];
  labcategory: string[];
  users?: any[];
  createdAt?: Date;
  available?: boolean;
}
