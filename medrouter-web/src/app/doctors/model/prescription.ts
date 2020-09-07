import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { ExamStatus } from "../enums/status.enum";

export class PrescriptionDto {
  id?: any;
  code?: number;
  doctor?: {
    specialty?: string[];
    id: any;
    user: {
      surname?: string;
      fullname?: string;
      username?: string;
      avatar: {
        url: string;
      };
    };
  };
  client?: {
    id?: any;
    user?: {
      surname?: string;
      fullname?: string;
      username?: string;
      avatar?: {
        url?: string;
      };
    };
  };
  recomendations?: Array<string>;
  exams?: Array<{
    id: any;
    type: ExamsEnum;
    status?: ExamStatus;
    deadline?: number;
    createdAt?: Date;
    price?: number;
    lab?: {
      id?: string;
      name?: string;
    };
  }>;
  medicines?: Array<{
    id: any;
    substance: string;
    presentantion?: string;
    formula?: string;
  }>;

  createdAt?: Date;
  pressure?: string;
  waist?: number;
  weight?: number;
  height?: number;
  bpm?: number;
  visible?: boolean = false;
}
