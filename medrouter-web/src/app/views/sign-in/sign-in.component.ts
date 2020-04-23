import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "./login.service";

import { faLock, faAt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;

  faLock = faLock;
  faAt = faAt;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required]),
    });
  }

  login() {
    this.loading = true;
    this.loginService.login(this.loginForm.value).subscribe(
      (user) => (this.loading = false),
      () => (this.loading = false)
    );
  }
}
