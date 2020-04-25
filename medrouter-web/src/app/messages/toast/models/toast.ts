import { Types } from "../enums/types";
import { Status } from "../enums/status";
import { Style } from "../enums/style";
import { ToastDto } from "../dto/toast-dto";

export class Toast {
  visibility: Status = Status.HIDDEN;
  style: { [keys: string]: string } = Style[Types.INFO];
  message: string = "Hello Toast";
  timer: number = 1000;

  init(toast?: ToastDto): void {
    this.message = toast.message || this.message;
    this.style = Style[toast.type] || this.style;
    this.timer = toast.timer || this.timer;
  }

  show(): void {
    this.visibility = Status.VISIBLE;
  }

  hide(): void {
    this.visibility = Status.HIDDEN;
  }

  setMsg(msg: string) {
    this.message = msg;
  }

  getStatus(): Status {
    return this.visibility;
  }
}
