import { Component, OnInit, ContentChild, Input } from "@angular/core";

import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NgModel, FormControlName } from "@angular/forms";
import { Colors } from "src/app/messages/toast/enums/colors";

@Component({
  selector: "app-input-container",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit {
  @ContentChild(NgModel) model: NgModel;

  @ContentChild(FormControlName) control: FormControlName;

  @Input() tick: boolean = true;
  @Input() label: string;
  @Input() errorMessage: string;

  @Input() mainColor: Colors = Colors.BASE;

  faTimes = faTimes;
  faCheck = faCheck;

  input: any;
  constructor() {}

  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw new Error(
        "Este componenente precisa ser renderizado com uma diretiva ngModel ou FormControlName"
      );
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }
}
