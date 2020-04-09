import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsPhoneNumber,
  IsIn,
} from 'class-validator';

import { EmailTopic } from '../enums/email-topic';

export class EmailDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  username: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
  phonenumber: string;

  type: EmailTopic;

  @IsNotEmpty()
  @IsString()
  @Length(10, 150)
  msg: string;
}
