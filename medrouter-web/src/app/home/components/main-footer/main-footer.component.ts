import { Component, OnInit } from "@angular/core";

import {
  faInstagram,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-main-footer",
  templateUrl: "./main-footer.component.html",
  styleUrls: ["./main-footer.component.scss"],
})
export class MainFooterComponent implements OnInit {
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faWhatsapp = faWhatsapp;
  constructor() {}

  ngOnInit(): void {}
}
