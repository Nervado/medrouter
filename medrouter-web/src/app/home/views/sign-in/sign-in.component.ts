import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../auth/auth.service";

import { faLock, faAt } from "@fortawesome/free-solid-svg-icons";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";

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

    // at load component save the activated route
    this.navigateTo = this.activeRoute.snapshot.params["to"] || "/";
  }

  login() {
    this.loading = true;
    this.AuthService.login(this.loginForm.value).subscribe(
      (user) => {
        this.loading = false;
        this.notificationService.notify({
          message: `Bem vindo ${user.user.username} !`,
          type: Types.BASE,
        });
      }, // ok
      (error) => {
        this.loading = false;
        this.notificationService.notify({
          message: "Verifique seus dados",
          type: Types.OPOSITY1,
        });
      },
      () => {
        if (this.navigateTo !== "/") {
          this.router.navigate([this.navigateTo]);
        } else {
          this.router.navigate([this.AuthService.defaultRoute]);
        }
      }
    );
  }
}
