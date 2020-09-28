import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../auth/auth.service";

import { faLock, faAt } from "@fortawesome/free-solid-svg-icons";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { User } from "src/app/auth/models/user.model";
import { Role } from "src/app/auth/enums/roles-types";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  rememberme: boolean = false;
  navigateTo: string;

  forgot: boolean = false;

  faLock = faLock;
  faAt = faAt;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rememberme = this.AuthService.isloggedIn();
    this.loginForm = this.fb.group({
      username: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required]),
      rememberme: this.fb.control(this.rememberme),
      forgot: this.fb.control(""),
    });

    this.navigateTo = this.activeRoute.snapshot.params["to"] || "/";
  }

  login() {
    this.loading = true;

    if (!this.loginForm.value.forgot) {
      this.AuthService.login(this.loginForm.value).subscribe(
        (user) => {
          this.loading = false;
          this.loginMessage(user);
          this.AuthService.getUserPermissions();
        },
        (error) => {
          this.loading = false;
          this.notificationService.notify({
            message: "Verifique seus dados",
            type: Types.OPOSITY1,
          });
        },
        () => {
          //this.router.navigate([this.AuthService.defaultRoute]);
        }
      );
    } else {
      if (this.loginForm.value.username === undefined) {
        this.notificationService.notify({
          message: "Por favor informe seu email de cadastro",
          type: Types.ERROR,
          timer: 10000,
        });
      } else {
        this.AuthService.forgot(this.loginForm.value.username).subscribe({
          next: () => {
            this.notificationService.notify({
              message: "Uma nova senha foi enviada para seu email de cadastro.",
              type: Types.INFO,
              timer: 10000,
            });
          },
          error: () => {
            this.notificationService.notify({
              message:
                "Não foi possível recuperar seu cadastro, por favor entre em contato com nosso suporte.",
              type: Types.ERROR,
              timer: 10000,
            });
          },
        });
      }
    }
  }

  loginMessage(user: User): void {
    if (user.user.role[0] === Role.USER) {
      this.notificationService.notify({
        message: `Olá ${user.user.username}, por favor verifique seu email de cadastro !`,
        type: Types.INFO,
      });

      return null;
    }

    this.notificationService.notify({
      message: `Bem vindo ${user.user.username} !`,
      type: Types.BASE,
    });
  }
}
