import { AvatarDto } from 'src/avatars/dto/avatar.dto';
import { AddressDto } from 'src/address/dto/adress.dto';
import { PhotoDto } from 'src/photos/dto/photo.dto';
import { Sex } from '../enuns/sex.enum';

export class UserUpdateDto {
  username?: string;
  surname?: string;
  address?: AddressDto;
  avatar?: AvatarDto;
  photos?: PhotoDto;
  birthdate?: Date;
  sex?: Sex;
}
