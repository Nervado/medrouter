import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

export class AuthSingUpDto {
  @IsString()
  @MaxLength(200)
  @MinLength(2)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  surname: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  @IsPhoneNumber('BR')
  phoneNumber: string;

  @IsString()
  @MaxLength(5)
  @MaxLength(200)
  @IsNotEmpty()
  @Matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    {
      message: 'Invalid email',
    },
  )
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password dont match',
  })
  passwordConfirmation?: string;

  avatar?: {
    avatarId: number;
    url: string;
    path: string;
  };
}
