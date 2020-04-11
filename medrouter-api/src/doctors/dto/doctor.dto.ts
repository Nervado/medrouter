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
} from 'class-validator';

import { Specialty } from '../enums/specialty.enum';

import { UserDto } from 'src/users/dto/user-dto';

export class DoctorDto {
  @IsNumber()
  @IsNotEmpty()
  @Max(100000)
  @Min(100)
  @IsOptional()
  salary: number;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Specialty, { each: true })
  specialty?: Specialty[];

  @ValidateNested()
  user: UserDto;

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
