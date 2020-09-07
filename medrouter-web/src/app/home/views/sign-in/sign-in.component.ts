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
    });

    this.navigateTo = this.activeRoute.snapshot.params["to"] || "/";
  }

  login() {
    this.loading = true;
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
