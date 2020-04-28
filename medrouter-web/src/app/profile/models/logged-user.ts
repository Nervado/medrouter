import { Role } from "src/app/auth/enums/roles-types";

export class UserLogged {
  username: string;
  userId: number;
  email: string;
  role: Array<Role>;
}
