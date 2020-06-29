import { Directive, Output, EventEmitter } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[formControlName][appCpfMask]",
  host: {
    "(ngModelChange)": "onInputChange($event)",
  },
})
export class CpfMaskDirective {
  @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public model: NgControl) {}

  onInputChange(value: string) {
    if (value !== null) {
      const x = value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);

      const y = x.input ? x[1] + "." + x[2] + "." + x[3] + "-" + x[4] : "";

      this.model.valueAccessor.writeValue(y);
      this.rawChange.emit(y);
    }
  }
}
