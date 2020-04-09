import { AvatarDto } from 'src/avatars/dto/avatar.dto';
import { AddressDto } from 'src/address/dto/adress.dto';

export class UserUpdateDto {
  username?: string;
  surname?: string;
  adress?: AddressDto;
  avatar?: AvatarDto;
}
