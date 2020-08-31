export class ClientDto {
  id: string;
  doc?: {
    url: string;
  };
  photo?: {
    url: string;
  };
  user?: {
    userId: string | number;
    username: string;
    surname: string;
    fullname: string;
    email: string;
    phoneNumber: string;
    sex: string;
    birthdate: Date;
    checked: boolean;
    avatar: {
      url: string;
    };
  };
}
