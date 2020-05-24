import { Directive, Output, EventEmitter } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[formControlName][appCepMask]",

  host: {
    "(ngModelChange)": "onInputChange($event)",
  },
})
export class CepMaskDirective {
  @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public model: NgControl) {}

  onInputChange(value: string) {
    const x = value.replace(/\D/g, "").match(/(\d{0,5})(\d{0,3})/);

    const y = x.input ? x[1] + "-" + x[2] : "";

    this.model.valueAccessor.writeValue(y);
    this.rawChange.emit(y);
  }
}
