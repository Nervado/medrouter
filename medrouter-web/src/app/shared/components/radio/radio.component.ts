import { Component, OnInit, Input } from "@angular/core";
import { RadioOption } from "./models/radio-options.model";
import { Colors } from "src/app/messages/toast/enums/colors";

@Component({
  selector: "app-radio",
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.scss"],
})
export class RadioComponent implements OnInit {
  @Input() options: RadioOption[];

  value: any;

  @Input() bgColor: Colors = Colors.PROFILE;
  @Input() bgBase: Colors = Colors.BASE;
  @Input() bgOposity: Colors = Colors.OPOSITY;

  constructor() {}

  ngOnInit(): void {
    this.value = this.options[0];
  }

  setValue(value: any) {
    console.log(value);
    this.value = value;
  }
}
