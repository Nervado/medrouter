import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";

@Component({
  selector: "app-badge",
  templateUrl: "./badge.component.html",
  styleUrls: ["./badge.component.scss"],
})
export class BadgeComponent implements OnInit, OnChanges {
  @Input() numberOfEvents: number = 0;
  @Input() mainColor: Colors = Colors.ERROR;

  msg: string;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["numberOfEvents"]) {
      this.setMessage();
    }
  }

  ngOnInit(): void {
    this.setMessage();
  }

  setMessage() {
    if (this.numberOfEvents > 9) {
      this.msg = "9+";
    } else {
      this.msg = `${this.numberOfEvents}`;
    }
  }
}
