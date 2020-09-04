import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  Matches,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { LabCategory } from '../enums/category.enum';
import { ExamsEnum } from 'src/exams/enums/exams.enum';

export class LabDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
  cnpj?: string;

  @IsOptional()
  @IsBoolean()
  available: boolean;

  @IsNotEmpty()
  @IsEnum(LabCategory, { each: true })
  labcategory: LabCategory[];

  @IsOptional()
  @IsEnum(ExamsEnum, { each: true })
  exams?: ExamsEnum[];
}
