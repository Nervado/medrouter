import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../../auth/auth.service";

import { faLock, faAt, faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  loading: boolean = false;

  faLock = faLock;
  faAt = faAt;
  faUser = faUser;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: this.fb.control("", [Validators.required]),
      surname: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required, Validators.min(6)]),
      passwordConfirmation: this.fb.control("", [
        Validators.required,
        Validators.min(6),
      ]),
    });
  }

  signUp() {
    //toDo
    this.loading = true;

    this.authService.signUp(this.signUpForm.value).subscribe(
      () => (this.loading = false),
      () => (this.loading = false),
      () => (this.loading = false)
    );
  }
}
