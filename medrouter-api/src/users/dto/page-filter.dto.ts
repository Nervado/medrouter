import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PageFilterDto {
  @IsNotEmpty()
  @IsNumberString()
  page: number;
}
