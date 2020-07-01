import { AddressDto } from 'src/address/dto/adress.dto';
import { AvatarDto } from 'src/avatars/dto/avatar.dto';

import { IsEmail, IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  userId?: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  surname?: string;

  @IsOptional()
  fullname?: string;

  @IsOptional()
  address?: AddressDto;

  @IsOptional()
  avatar?: AvatarDto;

  @IsOptional()
  isdmin?: boolean;
  ispro?: boolean;
}
