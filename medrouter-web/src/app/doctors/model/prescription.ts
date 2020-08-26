import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { ExamStatus } from "../enums/status.enum";

export class PrescriptionDto {
  id?: any;
  code?: number;
  doctor?: {
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
  recommendations?: Array<string>;
  exams?: Array<{
    id: any;
    type: ExamsEnum;
    status?: ExamStatus;
  }>;
  medicines?: Array<{
    id: any;
    substance: string;
    presentantion?: string;
  }>;

  createdAt?: Date;
  pressure?: string;
  waist?: number;
  weight?: number;
  height?: number;
  bpm?: number;
}
