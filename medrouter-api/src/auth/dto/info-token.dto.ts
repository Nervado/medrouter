import { Role } from '../enums/role.enum';

export class InfoToken {
  userId: number;
  username: string;
  email: string;
  role: Array<Role>;
}
