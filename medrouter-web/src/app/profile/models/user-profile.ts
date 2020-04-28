import { Role } from "src/app/auth/enums/roles-types";

export class Profile {
  userId: number;
  username: number;
  surname: string;
  cpf: string;
  phoneNumber: string;
  email: string;
  admin: boolean;
  recept: boolean;
  doctor: boolean;
  client: boolean;
  owner: boolean;
  role: Array<Role>;
  avatar: {
    avatarId: number;
    filename: string;
    url: string;
  };
  address: {
    id: number;
    cep: string;
    streetName: string;
    houseNumber: string;
    complement: string;
    neighborhood: string;
    city: string;
    fu: string;
  };
  fullname: string;
}
