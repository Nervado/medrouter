import {
  ValidateNested,
  IsNumber,
  IsNotEmpty,
  Max,
  Min,
  IsEnum,
  IsOptional,
  IsString,
  IsDecimal,
  IsNumberString,
} from 'class-validator';

import { Specialty } from '../enums/specialty.enum';

import { UserDto } from 'src/users/dto/user-dto';

[
  {
    id: 1,
    salary: '20000.00',
    hireddate: '2020-05-17T07:11:52.593Z',
    dismissdate: null,
    ishired: true,
    specialty: ['Clinica_medica'],
    user: {
      userId: 1,
      username: 'Evandro',
      surname: 'Abreu',
      cpf: null,
      phoneNumber: '(21) 97285-7728',
      birthdate: '1989-06-25T03:00:00.000Z',
      sex: 'Masculino',
      email: 'teste@teste.com',
      admin: false,
      recept: false,
      doctor: true,
      client: true,
      owner: true,
      role: ['doctor', 'client'],
      createdAt: '2020-05-12T02:37:16.919Z',
      address: {
        id: 1,
        cep: '20950-085',
        streetName: 'Rua 24 de Maio',
        houseNumber: '99',
        complement: 'Apt 603',
        neighborhood: 'Rocha',
        city: 'Rio de Janeiro',
        fu: 'Rio de Janeiro',
      },
      avatar: {
        avatarId: 4,
        filename: 'f3523670efdd9f3f35e097da50e4257e.jpeg',
        url:
          'http://192.168.0.16:3001/avatars/f3523670efdd9f3f35e097da50e4257e.jpeg',
      },
      fullname: 'Evandro Abreu',
    },
  },
];

export class DoctorDto {
  @IsNumber()
  @IsNotEmpty()
  @Max(100000)
  @Min(100)
  @IsOptional()
  salary: number;

  @IsOptional()
  @IsEnum(Specialty, { each: true })
  specialty?: Specialty[];

  @ValidateNested()
  user: UserDto;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  @Max(100000)
  @Min(-100000)
  @IsDecimal()
  diff: number;
}
