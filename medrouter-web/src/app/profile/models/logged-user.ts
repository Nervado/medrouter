import { Role } from "src/app/auth/enums/roles-types";

export class UserLogged {
  username: string;
  userId: any;
  email: string;
  role: Array<Role>;
}
