export class EmployeeDto {
  id: string;
  ishired: boolean;
  salary: number;
  hireddate: Date;
  dismissdate: Date;
  status?: string;
  diff?: number;
  user: {
    username: string;
    fullname: string;
    cpf: string;
    userId: string;
    avatar: {
      id: any;
      url: string;
    };
  };
  edit?: boolean = false;
}
