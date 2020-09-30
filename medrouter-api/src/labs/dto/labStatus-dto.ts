import {
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  Matches,
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { User } from 'src/users/models/user.entity';
import { ExamsEnum } from 'src/exams/enums/exams.enum';
import { LabCategory } from '../enums/category.enum';

export class LabChangesDto {
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  users?: User[];

  @IsOptional()
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
  cpf?: string;

  @IsOptional()
  exams?: ExamsEnum[];

  @IsOptional()
  labcategory?: LabCategory[];
}
