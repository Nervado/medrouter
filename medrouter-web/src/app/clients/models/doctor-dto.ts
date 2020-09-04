export class DoctorDto {
  id: any;
  user: {
    fullname?: string;
    username?: string;
    avatar: { url: string };
  };
}
