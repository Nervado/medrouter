import { ExamStatus } from "../enums/status.enum";
import { ExamsEnum } from "../enums/exams.enum";

export class PrescriptionDto {
  id?: any;
  code?: number;
  doctor?: {
    specialty?: string[];
    id: any;
    user: {
      fullname: string;
      avatar: {
        url: string;
      };
    };
  };
  client?: {
    id?: any;
    user?: {
      fullname?: string;
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
