export class User {
  token: string;
  user: {
    username: string;
    userId: string;
    email: string;
    client: boolean;
    admin: boolean;
    recept: boolean;
    doctor: boolean;
    owner: boolean;
  };
}
