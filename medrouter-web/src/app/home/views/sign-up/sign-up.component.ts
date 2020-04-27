import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../../auth/auth.service";

import { faLock, faAt, faUser } from "@fortawesome/free-solid-svg-icons";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

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
    this.loading = true;
    this.authService.signUp(this.signUpForm.value).subscribe(
      () =>
        this.notificationService.notify({
          message: "Cadastro realizado com sucesso, verifique seu email!",
          type: Types.INFO,
        }),
      () =>
        this.notificationService.notify({
          message: "Por favor verifique os dados informados",
          type: Types.OPOSITY1,
        }),
      () => {
        this.authService.logout();
      }
    );
  }
}
