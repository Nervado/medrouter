import { Sex } from '../enuns/sex.enum';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsNumberString,
} from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class SearchFilterDto {
  @IsOptional()
  @IsEnum(Sex, { each: true })
  sex: Sex;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEnum(Role, { each: true })
  role: Role;

  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  ishired?: boolean;
}
