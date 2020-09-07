import { Available } from "./available.enum";

export class Doctor {
  id: string;
  salary: string;
  hireddate: Date;
  dismissdate: null;
  ishired: true;
  specialty: Array<string>;
  count?: number = 0;
  user: {
    userId: string;
    username: string;
    surname: string;
    cpf: string;
    phoneNumber: string;
    email: string;
    admin: string;
    recept: boolean;
    doctor: boolean;
    client: boolean;
    owner: boolean;
    role: Array<string>;
    address: any;
    avatar: any;
    fullname: string;
  };

  schedule?: {
    id?: string;
    date?: Date;
    hours?: [
      {
        busy: boolean;
        hour: Available;
      }
    ];
  };
}
