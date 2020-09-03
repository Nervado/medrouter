import { Role } from "../enums/roles-types";

export class User {
  token: string;
  user: {
    username: string;
    surname?: string;
    fullname?: string;
    userId: any;
    email: string;
    client: boolean;
    admin: boolean;
    recept: boolean;
    doctor: boolean;
    owner: boolean;
    role: Array<Role>;
    avatar: {
      avatarId: any;
      url: string;
      filename: string;
    };
  };
}
