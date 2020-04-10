import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IntFilterDto {
  @IsNotEmpty()
  @IsNumberString()
  page: number;
}
