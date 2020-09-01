import { ExamStatus } from "../enums/status.enum";

import { DocDto } from "../dtos/doc-dto";
import { ExamsEnum } from "../enums/exams.enum";
import { DoctorDto } from "./doctor-dto";

export class ExamDto {
  id?: any;
  prescriptionId?: string;
  price?: number;
  type: ExamsEnum;
  doctor?: DoctorDto;
  status?: ExamStatus;
  docs?: DocDto[];
  photos?: DocDto[];
  lab?: {
    id: any;
    name: string;
  };
  client?: {
    id: any;
    user: {
      fullname?: string;
      username?: string;
      avatar: { url: string };
    };
  };
  createdAt?: Date;
  deadline?: number;
}
