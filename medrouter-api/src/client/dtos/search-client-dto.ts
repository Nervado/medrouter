import {
  IsNumberString,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class SearchClientDto {
  @IsNotEmpty()
  @IsNumberString()
  page: number = 1;

  @IsOptional()
  @IsString()
  username: string;
}
