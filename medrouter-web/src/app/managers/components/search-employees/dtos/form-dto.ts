import { TypeActions, IncludeRule } from "../enums/actions-type";

export class ActionForm {
  type: TypeActions;
  include: IncludeRule;
  salary?: number;
  password: string;
}
