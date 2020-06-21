import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  Matches,
  IsBoolean,
} from 'class-validator';
import { LabCategory } from '../enums/category.enum';
import { ExamsEnum } from 'src/exams/enums/exams.enum';

export class LabDto {
  @IsString()
  name: string;

  @IsString()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
  cnpj: string;

  @IsBoolean()
  @IsOptional()
  available: boolean;

  @IsNotEmpty()
  @IsEnum(LabCategory, { each: true })
  labcategory: LabCategory[];

  @IsNotEmpty()
  @IsEnum(ExamsEnum, { each: true })
  exams: ExamsEnum[];
}
