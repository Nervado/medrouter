import { Role } from "../enums/roles-types";

export interface ModuleGuarInterface {
  checkAuthentication(path: string): boolean;
  findRole(roles: Array<Role>): string;
}
