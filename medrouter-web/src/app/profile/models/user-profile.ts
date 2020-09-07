import { Role } from "src/app/auth/enums/roles-types";
import { Address } from "./address";

export class Profile {
  userId: string;
  username: string;
  surname: string;
  cpf: string;
  phoneNumber: string;
  birthdate: Date;
  email: string;
  admin: boolean;
  recept: boolean;
  doctor: boolean;
  client: boolean;
  owner: boolean;
  sex: string;
  options: string;
  role: Array<Role>;
  avatar: {
    avatarId: number;
    filename: string;
    url: string;
  };
  address: Address;
  fullname: string;

  prettyDate?: string;

  createdAt: string;
}
