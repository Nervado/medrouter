import {
  IsNumberString,
  IsDate,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class SearchScheduleDto {
  @IsDateString()
  date?: Date;

  @IsNotEmpty()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
