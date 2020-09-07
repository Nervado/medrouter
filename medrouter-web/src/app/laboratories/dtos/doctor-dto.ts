export class DoctorDto {
  id: string;

  user: {
    userId?: string;
    username?: string;
    fullname?: string;
    avatar?: {
      url: string;
    };
  };
}
