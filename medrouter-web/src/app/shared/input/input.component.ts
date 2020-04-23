import { Component, OnInit, ContentChild, Input } from "@angular/core";

import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NgModel, FormControlName } from "@angular/forms";

@Component({
  selector: "app-input-container",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit {
  @ContentChild(NgModel) model: NgModel;

  @ContentChild(FormControlName) control: FormControlName;

  @Input() label: string;
  @Input() errorMessage: string;

  faTimes = faTimes;
  faCheck = faCheck;

  input: any;
  constructor() {}

  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.

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
