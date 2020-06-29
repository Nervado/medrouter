import { Directive, Output, EventEmitter } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[formControlName][appCelMask]",
  host: {
    "(ngModelChange)": "onInputChange($event)",
  },
})
export class CelMaskDirective {
  @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public model: NgControl) {}

  onInputChange(value: string) {
    if (value !== null) {
      const x = value
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/);

      const y = x.input ? "(" + x[1] + ") " + x[2] + x[3] + "-" + x[4] : "";

      this.model.valueAccessor.writeValue(y);
      this.rawChange.emit(y);
    }
  }
}
