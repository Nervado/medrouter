import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";

export class PrescriptionDto {
  id: any;
  doctor: {
    id: any;
    user: {
      fullname: string;
      avatar: {
        url: string;
      };
    };
  };
  client: {
    id: any;
    user: {
      fullname: string;
      avatar: {
        url: string;
      };
    };
  };
  recomendations: Array<string>;
  exams: Array<{
    id: any;
    type: ExamsEnum;
  }>;
  medicines: Array<{
    id: any;
    substance: string;
  }>;

  createdAt: Date;
}
