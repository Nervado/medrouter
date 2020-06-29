import { AddressDto } from 'src/address/dto/adress.dto';
import { AvatarDto } from 'src/avatars/dto/avatar.dto';

import { IsEmail } from 'class-validator';

export class UserDto {
  userId?: number;

  @IsEmail()
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
