import {
  ValidateNested,
  IsNumber,
  IsNotEmpty,
  Max,
  Min,
} from 'class-validator';
import { AvatarDto } from '../../avatars/dto/avatar.dto';
import { AddressDto } from '../../address/dto/adress.dto';
import { AuthSingUpDto } from '../../auth/dto/auth-signup.dto';
import { ReceptionistDto } from '../../receptionist/dto/receptionist.dto';

export class ManagerDto {
  @IsNumber()
  @IsNotEmpty()
  @Max(100000)
  @Min(100)
  salary: number;

  @ValidateNested()
  avatar?: AvatarDto;

  @ValidateNested()
  address?: AddressDto;

  @ValidateNested()
  user: AuthSingUpDto;

  @ValidateNested()
  receptionist?: ReceptionistDto[];
}
