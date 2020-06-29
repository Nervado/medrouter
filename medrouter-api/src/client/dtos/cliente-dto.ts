import {
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Matches,
} from 'class-validator';
import { Sex } from 'src/users/enuns/sex.enum';

export class ClientDto {
  @IsString()
  @MaxLength(200)
  @MinLength(2)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  surname?: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  @IsPhoneNumber('BR')
  phoneNumber?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  @IsNotEmpty()
  @Matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    {
      message: 'Invalid email',
    },
  )
  email: string;

  password?: string;

  passwordConfirmation?: string;

  user?: {
    userId: string | number;
    username: string;
    surname: string;
    fullname: string;
    email: string;
    phoneNumber: string;
    sex: Sex;
    birthdate: Date;
    avatar: {
      url: string;
    };
  };
}
