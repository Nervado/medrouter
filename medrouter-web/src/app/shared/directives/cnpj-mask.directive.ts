import { Directive, Output, EventEmitter } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[formControlName][appCnpjMask]",

  host: {
    "(ngModelChange)": "onInputChange($event)",
  },
})
export class CnpjMaskDirective {
  @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public model: NgControl) {}

  onInputChange(value: string) {
    const x = value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    //.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
    // /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/

    const y = x.input
      ? x[1] + "." + x[2] + "." + x[3] + "/" + x[4] + "-" + x[5]
      : "";

    this.model.valueAccessor.writeValue(y);
    this.rawChange.emit(y);
  }
}
