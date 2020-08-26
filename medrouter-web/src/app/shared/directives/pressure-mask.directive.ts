import { Directive, Output, EventEmitter } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[appPressureMask]",
  host: {
    "(ngModelChange)": "keyup($event)",
  },
})
export class PressureMaskDirective {
  @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public model: NgControl) {}

  keyup(value: string) {
    if (value !== null) {
      const x = value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})/);

      const y = x.input ? x[1] + "/" + x[2] : "";

      this.model.valueAccessor.writeValue(y);
      this.rawChange.emit(y);
    }
  }
}
