import { Component, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Profile } from "../../models/user-profile";
import { UsersService } from "../../users.service";
import { AuthService } from "src/app/auth/auth.service";
import { SignOutDto } from "../../models/sign-out.dto";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-unsubscribe",
  templateUrl: "./unsubscribe.component.html",
  styleUrls: ["./unsubscribe.component.scss"],
})
export class UnsubscribeComponent implements OnInit {
  profile: Profile;

  check: boolean = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.profile = this.usersService.getUserProfile();
  }

  showModalConfirmation(e, modal) {
    if (this.check.valueOf()) modal.open(modal.content);
  }

  confirm(e) {
    if (this.checkPassword(e)) {
      this.usersService.delete(this.profile.userId).subscribe({
        complete: () => this.authService.logout(),
        error: () =>
          this.ns.notify({
            message: "Algo deu errado, tente novamente mais tarde",
            type: Types.ERROR,
          }),
      });
    }
  }

  checkPassword(signOutDto: SignOutDto): boolean {
    if (
      this.authService.loginDto !== undefined &&
      signOutDto.password === this.authService.loginDto.password
    ) {
      return true;
    }
    this.ns.notify({
      message: "Realize um novo login para validar esta operação",
      type: Types.OPOSITY1,
    });
    return false;
  }
}
