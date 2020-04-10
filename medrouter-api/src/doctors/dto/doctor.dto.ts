import {
  ValidateNested,
  IsNumber,
  IsNotEmpty,
  Max,
  Min,
  IsEnum,
} from 'class-validator';

import { Specialty } from '../enums/specialty.enum';

import { UserDto } from 'src/users/dto/user-dto';

export class DoctorDto {
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @Max(100000)
  @Min(100)
  salary: number;

  @IsNotEmpty()
  @IsEnum(Specialty, { each: true })
  specialty: Specialty[];

  @ValidateNested()
  user: UserDto;
}
