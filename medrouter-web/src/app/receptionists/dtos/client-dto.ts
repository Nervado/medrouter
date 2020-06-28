export class ClientDto {
  id: string;
  user?: {
    userId: string | number;
    username: string;
    surname: string;
    fullname: string;
    email: string;
    phoneNumber: string;
    sex: string;
    birthdate: Date;
    avatar: {
      url: string;
    };
  };
}
