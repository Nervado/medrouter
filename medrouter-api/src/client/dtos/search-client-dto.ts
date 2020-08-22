import { IsString, IsOptional } from 'class-validator';

export class SearchClientDto {
  @IsOptional()
  page?: number = 1;

  @IsOptional()
  @IsString()
  username: string;
}
