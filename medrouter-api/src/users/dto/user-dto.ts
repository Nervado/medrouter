import { AddressDto } from 'src/address/dto/adress.dto';
import { AvatarDto } from 'src/avatars/dto/avatar.dto';

export class UserDto {
  userId?: number;
  email: string;
  username: string;
  phoneNumber?: string;
  surname?: string;
  fullname?: string;
  address?: AddressDto;
  avatar?: AvatarDto;
  isdmin?: boolean;
  ispro?: boolean;
}
