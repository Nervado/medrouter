import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/auth/models/user.model";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { Router } from "@angular/router";

@Component({
  selector: "app-security",
  templateUrl: "./security.component.html",
  styleUrls: ["./security.component.scss"],
})
export class SecurityComponent implements OnInit {
  securityForm: FormGroup;
  faUser = faUser;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.securityForm = this.fb.group({
      show: this.fb.control(false),
      password: this.fb.control(this.authService.loginDto?.password, [
        Validators.required,
      ]),
      newPassword: this.fb.control("", [Validators.required]),
      passwordConfirmation: this.fb.control("", [Validators.required]),
    });
  }

  send() {
    console.log(this.securityForm.value);
    this.authService.patch(this.securityForm.value).subscribe(
      () => {
        this.notificationService.notify({
          message: "Senha alterada com sucesso",
          type: Types.BASE,
        });
      },

      () =>
        this.notificationService.notify({
          message: "Falha ao atualizar senha, verifique seus dados",
          type: Types.OPOSITY1,
        }),

      () => this.return()
    );
  }

  show = true;

  return() {
    this.router.navigate(["profile", this.authService.getUser().user.userId]);
  }

  toogle() {}
}
