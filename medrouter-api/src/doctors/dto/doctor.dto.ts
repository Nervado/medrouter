import {
  ValidateNested,
  IsNumber,
  IsNotEmpty,
  Max,
  Min,
  IsEnum,
  IsOptional,
  IsString,
  IsDecimal,
  IsNumberString,
} from 'class-validator';

import { Specialty } from '../enums/specialty.enum';

import { UserDto } from 'src/users/dto/user-dto';

export class DoctorDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Max(100000)
  @Min(100)
  salary?: number;

  @IsOptional()
  @IsEnum(Specialty, { each: true })
  specialty?: Specialty[];

  @IsOptional()
  @ValidateNested()
  user?: UserDto;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  @Max(100000)
  @Min(-100000)
  @IsDecimal()
  diff?: number;

  @IsOptional()
  mh?: number;
}
