// import { User } from 'src/users/models/user.entity';

export class JwtPayload {
  userId?: number;
  username?: string;
  email?: string;
  ispro?: boolean;
  admin?: boolean;
}
