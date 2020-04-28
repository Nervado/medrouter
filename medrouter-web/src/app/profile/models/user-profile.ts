import { Role } from "src/app/auth/enums/roles-types";
import { Address } from "./address";

export class Profile {
  userId: any;
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
  address: Address;
  fullname: string;
}
