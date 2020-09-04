import { DoctorDto } from "./doctor-dto";
import { ExamStatus } from "../enums/status.enum";
import { ExamsEnum } from "../enums/exams.enum";

export class ExamDto {
  id: string;
  price: number;
  type: ExamsEnum;
  doctor: DoctorDto;
  status: ExamStatus;
  docs?: [{ id: any; url: string }];
  photos?: [{ id: any; url: string }];
  lab?: {
    id: any;
    name: string;
  };
  client: {
    id: any;
    user: {
      fullname?: string;
      username?: string;
      avatar: { url: string };
    };
  };
  createdAt: Date;
  code?: string;
  deadline?: number;
}
