import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class NameFilterDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
