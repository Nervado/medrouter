import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  id: any;

  @IsString()
  @IsNotEmpty()
  streetName: string;

  @IsString()
  @IsNotEmpty()
  houseNumber: string;

  @IsString()
  @IsOptional()
  complement: string;

  @IsString()
  @IsOptional()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  fu: string;

  @IsString()
  @IsNotEmpty()
  cep: string;
}
