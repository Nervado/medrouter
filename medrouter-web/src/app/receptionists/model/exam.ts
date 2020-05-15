import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { DoctorDto } from "./doctor-dto";
import { ExamStatus } from "../enums/status.enum";

export class ExamDto {
  id: any;
  price: number;
  type: ExamsEnum;
  doctor: DoctorDto;
  status: ExamStatus;
  docs?: [{ id: any; url: string }];
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
}
