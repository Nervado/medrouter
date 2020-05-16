import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  faUser,
  faCameraRetro,
  faTrash,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../models/avatar.dto";
import { UsersService } from "../users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { Profile } from "../models/user-profile";

@Component({
  selector: "app-profile-upload-id",
  templateUrl: "./profile-upload-id.component.html",
  styleUrls: ["./profile-upload-id.component.scss"],
})
export class ProfileUploadIdComponent implements OnInit {
  securityForm: FormGroup;
  faUser = faUser;
  faCameraRetro = faCameraRetro;
  faTrash = faTrash;

  avatar: Avatar;
  newAvatar: Avatar = undefined;
  preview: string | ArrayBuffer;
  formFile: FormGroup;
  file: File;
  userId: any;

  faIdCard = faIdCard;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.avatar = this.usersService.getUserProfile().avatar;
    this.userId = this.activatedRoute.parent.snapshot.params["id"];
    this.preview = null;
    this.formFile = this.fb.group({
      file: [null, Validators.required],
    });
  }

  handleChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formFile.patchValue({
          avatar: reader.result,
        });
        this.preview = reader.result;
      };

      this.cd.markForCheck();
      this.upload();
    }
  }

  upload() {
    let formData: FormData = new FormData();
    formData.append("avatar", this.file);

    this.usersService.uploadAvatar(formData).subscribe(
      (avatar: Avatar) => (this.newAvatar = avatar),
      () => {
        this.notification.notify({
          message:
            "Tamanho máximo: 2 MB, Tipos aceitos: .jpg, .jpeg, .png, ou .gif!",
          type: Types.OPOSITY1,
          timer: 4000,
        });
        this.preview = "";
      }
    );
  }

  update() {
    if (this.newAvatar === undefined) {
      return;
    }

    const userProfile: Profile = this.usersService.getUserProfile();

    userProfile.avatar = this.newAvatar;

    this.usersService.update(userProfile, this.userId).subscribe(
      () => {
        this.newAvatar = null;
      },
      () => {
        this.notification.notify({
          message: "Falha ao atualizar foto =(",
          type: Types.OPOSITY1,
        });
      },
      () => {
        this.notification.notify({
          message: "Foto atualizada com sucesso!",
          type: Types.BASE,
        });
        this.avatar = this.usersService.getUserProfile().avatar;
        this.preview = "";
        this.router.navigate(["profile", this.userId]);
      }
    );
  }

  delete(id: any): void | boolean {
    if (id === null || id === undefined) {
      return false;
    }
    this.usersService.deleteAvatar(id).subscribe(
      () => {
        if (this.avatar !== null && id === this.avatar.avatarId) {
          this.avatar = null;
        } else if (this.newAvatar !== null && id === this.newAvatar.avatarId) {
          this.newAvatar = null;
          this.preview = null;
        }
      },
      () => {
        this.notification.notify({
          message: "Erro ao tentar deletar foto =(",
          type: Types.OPOSITY1,
        });
      },
      () => {
        this.notification.notify({
          message: "Foto deletada",
          type: Types.BASE,
        });
      }
    );
  }

  cancel() {
    if (this.newAvatar !== undefined && this.newAvatar !== null) {
      this.delete(this.newAvatar.avatarId);
    }

    this.router.navigate(["profile", this.userId]);
  }
}
