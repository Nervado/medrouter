import { Component, OnInit } from "@angular/core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  faCoffee = faCoffee;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faWhatsapp = faWhatsapp;

  constructor() {}

  ngOnInit(): void {}
}
