import { Component, OnInit, Input, AfterContentInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import { capitalizeAndRemoveUnderscores } from "src/app/utils/capitalizeAndRemoveUnderscore";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-multi-list-view",
  templateUrl: "./multi-list-view.component.html",
  styleUrls: ["./multi-list-view.component.scss"],
})
export class MultiListViewComponent implements OnInit {
  @Input() tags: string[] = [];
  @Input() w: string = "150px";
  @Input() h: string = "30px";
  @Input() mainColor: Colors = Colors.BASE;

  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

  point: number = 0;
  length: number = 0;

  constructor() {}
  ngOnInit(): void {
    this.length = this.tags?.length;
    this.tags = this.tags?.map((value) =>
      capitalizeAndRemoveUnderscores(value).replace('"', "").replace('"', "")
    );

    console.log(this.tags);
  }

  up() {
    if (this.point < this.length - 1) this.point += 1;
  }

  down() {
    if (this.point > 0) this.point -= 1;
  }
}
