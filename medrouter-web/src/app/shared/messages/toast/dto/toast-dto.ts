import { Types } from "../enums/types";

export class ToastDto {
  message: string;
  type?: Types;
  timer?: number;
}
