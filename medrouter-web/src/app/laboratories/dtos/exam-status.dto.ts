import { ExamStatus } from "../enums/status.enum";

export class ExamStatusDto {
  status?: ExamStatus;
  code?: string;
  price?: number;
  deadline?: number;
  labId?: string;
  id?: string;
}
