import {
  ValidateNested,
  IsNumber,
  IsNotEmpty,
  Max,
  Min,
  IsOptional,
  IsDecimal,
  IsString,
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
  @IsOptional()
  salary: number;

  @ValidateNested()
  avatar?: AvatarDto;

  @ValidateNested()
  address?: AddressDto;

  @ValidateNested()
  user: AuthSingUpDto;

  @ValidateNested()
  @IsOptional()
  receptionist?: ReceptionistDto[];

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  @Max(100000)
  @Min(-100000)
  @IsDecimal()
  diff: number;
}
