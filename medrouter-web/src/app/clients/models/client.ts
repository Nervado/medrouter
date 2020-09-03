export class Client {
  id: any;
  user: {
    phoneNumber?: string;
    username?: string;
    surname?: string;
    fullname?: string;
    avatar?: {
      url?: string;
    };
  };
  prescription?: Array<any>;
  apppointments?: Array<any>;
}
