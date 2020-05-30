import { Sex } from '../enuns/sex.enum';
import { IsEnum, IsOptional, IsString, IsNumberString } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class SearchFilterDto {
  @IsOptional()
  @IsEnum(Sex)
  sex: Sex;

  @IsString()
  @IsOptional()
  username: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  ishired: boolean;
}
