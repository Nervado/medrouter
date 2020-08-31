export class DoctorDto {
  id: any;

  user: {
    userId?: any;
    username?: string;
    fullname?: string;
    avatar?: {
      url: string;
    };
  };
}
