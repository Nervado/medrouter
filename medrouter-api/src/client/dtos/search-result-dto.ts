import { Sex } from 'src/users/enuns/sex.enum';
import { ValidateNested, IsString } from 'class-validator';

export class SearchResultDto {
  @IsString()
  id?: string;

  doc?: {
    url: string;
  };

  @ValidateNested()
  user?: {
    userId?: number | string;
    username?: string;
    surname?: string;
    fullname?: string;
    email?: string;
    phoneNumber?: string;
    sex?: Sex;
    birthdate?: Date;
    checked?: boolean;

    avatar?: {
      avatarId?: number | string;
      url?: string;
    };
  };
}
