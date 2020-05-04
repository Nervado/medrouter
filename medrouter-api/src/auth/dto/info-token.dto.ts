import { Role } from '../enums/role.enum';
import { AvatarDto } from 'src/avatars/dto/avatar.dto';

export class InfoToken {
  userId: number;
  username: string;
  email: string;
  role: Array<Role>;
  avatar: AvatarDto;
}
