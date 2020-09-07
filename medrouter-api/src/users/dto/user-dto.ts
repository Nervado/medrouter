import { AddressDto } from 'src/address/dto/adress.dto';
import { AvatarDto } from 'src/avatars/dto/avatar.dto';

import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

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
