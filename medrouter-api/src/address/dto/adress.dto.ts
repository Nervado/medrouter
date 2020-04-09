import { IsString, IsNotEmpty } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @IsString()
  @IsNotEmpty()
  houseNumber: string;

  @IsString()
  @IsNotEmpty()
  complement: string;

  @IsString()
  @IsNotEmpty()
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
