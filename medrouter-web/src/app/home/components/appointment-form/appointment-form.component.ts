import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: "app-appointment-form",
  templateUrl: "./appointment-form.component.html",
  styleUrls: ["./appointment-form.component.scss"],
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          opacity: 1,
          "max-height": "130px",
        })
      ),
      state(
        "closed",
        style({
          opacity: 0,
          "max-height": "0px",
        })
      ),
      transition("closed => open", [animate("300ms 0s ease-in")]),
    ]),
  ],
})
export class AppointmentFormComponent implements OnInit {
  @Input() isOpen: boolean = false;

  @Output() openModal: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.isOpen = false;
  }

  confirm() {
    this.openModal.emit("confirm");
  }
}
