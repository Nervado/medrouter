import { DoctorDto } from "./doctor-dto";
import { ExamStatus } from "../enums/status.enum";
import { ExamsEnum } from "../enums/exams-types";

export class ExamDto {
  id?: any;
  prescriptionId?: string;
  price?: number;
  type: ExamsEnum;
  doctor?: DoctorDto;
  status?: ExamStatus;
  docs?: [{ id: any; url: string }];
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
