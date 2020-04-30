import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-security",
  templateUrl: "./security.component.html",
  styleUrls: ["./security.component.scss"],
})
export class SecurityComponent implements OnInit {
  securityForm: FormGroup;
  faUser = faUser;

  constructor() {}

  ngOnInit(): void {}

  send() {
    console.log(this.securityForm.value);
  }
}
