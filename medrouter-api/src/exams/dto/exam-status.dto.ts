import { ExamStatus } from '../enums/status.enum';
import {
  IsNumber,
  Max,
  Min,
  IsPositive,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class ExamStatusDto {
  @IsEnum(ExamStatus, { each: true })
  status?: ExamStatus;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsNumber()
  @Max(180)
  @Min(0)
  deadline?: number;
  labId?: string;
}
