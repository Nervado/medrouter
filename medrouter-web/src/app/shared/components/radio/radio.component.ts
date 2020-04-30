import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { RadioOption } from "./models/radio-options.model";
import { Colors } from "src/app/messages/toast/enums/colors";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-radio",
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements OnInit, ControlValueAccessor {
  @Input() options: RadioOption[];

  value: any;
  onChange: any;

  @Input() bgColor: Colors = Colors.PROFILE;
  @Input() bgBase: Colors = Colors.BASE;
  @Input() bgOposity: Colors = Colors.OPOSITY;

  constructor() {}

  ngOnInit(): void {
    //this.value = this.options[0];
  }

  setValue(value: any) {
    this.value = value;
    this.onChange(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched() {}
}
