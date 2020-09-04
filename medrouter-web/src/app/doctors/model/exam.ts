import { DoctorDto } from "./doctor-dto";
import { ExamStatus } from "../enums/status.enum";
import { ExamsEnum } from "../enums/exams-types";
import { DocDto } from "../dtos/doc-dto";

export class ExamDto {
  id?: string;
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
