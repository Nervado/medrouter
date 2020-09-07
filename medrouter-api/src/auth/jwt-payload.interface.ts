// import { User } from 'src/users/models/user.entity';

import { Role } from './enums/role.enum';

export class JwtPayload {
  userId: string;
  username: string;
  email: string;
  role: Role[];
}
