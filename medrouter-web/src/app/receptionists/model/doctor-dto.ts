import { Specialty } from "../enums/specialtys";

export class DoctorDto {
  id?: string;
  specialty?: Specialty[];
  mh?: number;
  user: {
    fullname?: string;
    username?: string;
    surname?: string;
    avatar?: {
      url: string;
    };
  };
}
