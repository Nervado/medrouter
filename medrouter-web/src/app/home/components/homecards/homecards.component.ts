import { Component, OnInit, Input } from "@angular/core";
import { HomeCard } from "./models/homecard.model";

@Component({
  selector: "app-homecards",
  templateUrl: "./homecards.component.html",
  styleUrls: ["./homecards.component.scss"],
})
export class HomecardsComponent implements OnInit {
  @Input() data: HomeCard;

  constructor() {}

  ngOnInit(): void {}
}
