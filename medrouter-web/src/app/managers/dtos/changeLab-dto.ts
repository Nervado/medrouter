import { userLab } from "./userLab-dto";
import { ExamsEnum } from "../components/add-lab-modal/enums/exams-types";
import { LabCategory } from "../components/add-lab-modal/enums/labs-types";

export class LabChangesDto {
  available?: boolean;
  users?: userLab[];
  cpf?: string;
  exams?: ExamsEnum[];
  labcategory?: LabCategory[];
  password?: string;
  id?: string;
}
