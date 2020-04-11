// import { User } from 'src/users/models/user.entity';

import { Role } from './enums/role.enum';

export class JwtPayload {
  userId: number;
  username: string;
  email: string;
  client: boolean;
  admin: boolean;
  recept: boolean;
  doctor: boolean;
  owner: boolean;
  role: Role[];
}
