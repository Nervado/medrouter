// import { User } from 'src/users/models/user.entity';

export class JwtPayload {
  userId: number;
  username: string;
  email: string;
  client: boolean;
  admin: boolean;
  recept: boolean;
  doctor: boolean;
  owner: boolean;
}
