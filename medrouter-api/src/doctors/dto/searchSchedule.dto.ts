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

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
