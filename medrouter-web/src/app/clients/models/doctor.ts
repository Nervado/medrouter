export class Doctor {
  id: number;
  salary: string;
  hireddate: Date;
  dismissdate: null;
  ishired: true;
  specialty: Array<string>;
  user: {
    userId: number;
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
}
