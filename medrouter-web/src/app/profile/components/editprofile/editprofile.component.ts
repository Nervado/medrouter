import { Component, OnInit } from "@angular/core";
import {
  faUserTie,
  faMapMarkerAlt,
  faStar,
  faTrash,
  faEdit,
  faUser,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { UserLogged } from "../../models/logged-user";
import { Profile } from "../../models/user-profile";
import { UsersService } from "../../users.service";
import { NotificationService } from "src/app/messages/notification.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Types } from "src/app/messages/toast/enums/types";
import { Colors } from "src/app/messages/toast/enums/colors";

import { CustomDateParserFormatter } from "../../../shared/components/datepicker/datepicker.component";

@Component({
  selector: "app-editprofile",
  templateUrl: "./editprofile.component.html",
  styleUrls: ["./editprofile.component.scss"],
})
export class EditprofileComponent implements OnInit {
  faUserTie = faUserTie;
  faLocationArrow = faMapMarkerAlt;
  faUser = faUser;
  faTrash = faTrash;
  faEdit = faEdit;

  userLogged: UserLogged = null;
  userProfile: Profile = null;
  loading: boolean = false;

  profile: Profile;
  userId: any;

  profileForm: FormGroup;

  birthdate: string;

  parser: CustomDateParserFormatter = new CustomDateParserFormatter();

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  btColor: Colors = Colors.BASE;
  tick: boolean = true;

  ngOnInit(): void {
    this.profile = this.usersService.getUserProfile();
    this.userId = this.activeRoute.parent.snapshot.params["id"];

    this.profileForm = this.fb.group({
      birthdate: this.fb.control(this.profile?.birthdate, [
        Validators.required,
      ]),
      options: this.fb.control(this.profile?.options, [Validators.required]),
      username: this.fb.control(this.profile?.username, [Validators.required]),
      surname: this.fb.control(this.profile?.surname, [Validators.required]),
      cpf: this.fb.control({ value: this.profile?.cpf, disabled: true }, [
        Validators.required,
      ]),
      email: this.fb.control({ value: this.profile?.email, disabled: true }, [
        Validators.required,
      ]),
      sex: this.fb.control(this.profile?.sex, [Validators.required]),
      phoneNumber: this.fb.control(this.profile?.phoneNumber, [
        Validators.required,
      ]),
    });

    console.log(this.profile.birthdate);
    if (
      this.profile.birthdate !== null &&
      this.profile.birthdate !== undefined
    ) {
      const date = new Date(this.profile.birthdate);
      this.birthdate = this.parser.format({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
      });
    } else {
      this.birthdate = "Data";
    }
  }
  send() {
    const updatedUserWithProfile = {
      ...this.usersService.getUserProfile(),
      ...this.profileForm.value,
    };

    this.usersService.update(updatedUserWithProfile, this.userId).subscribe(
      () =>
        this.notificationService.notify({
          message: "Perfil atualizado com sucesso",
          type: Types.BASE,
        }),
      () =>
        this.notificationService.notify({
          message: "Algo deu errado =(",
          type: Types.ERROR,
        }),
      () => this.router.navigate(["profile", this.userId])
    );
  }

  cancel() {
    this.router.navigate(["profile", this.userId]);
  }
}
