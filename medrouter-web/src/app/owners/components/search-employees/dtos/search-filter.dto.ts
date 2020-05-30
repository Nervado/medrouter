import { Role } from "src/app/auth/enums/roles-types";

export class SearchFilterDto {
  sex: string;
  username: string;
  role: Role;
  page: number;
  ishired: boolean;
}
