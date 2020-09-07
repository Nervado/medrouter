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
import { PhotoFile } from "../models/file.dto";
import { AuthService } from "src/app/auth/auth.service";
import { Role } from "src/app/auth/enums/roles-types";

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

  //avatar: Avatar;
  newAvatar: PhotoFile = undefined;
  preview: string | ArrayBuffer;
  formFile: FormGroup;
  file: File;
  userId: string;

  faIdCard = faIdCard;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private notification: NotificationService,
    private router: Router,
    private as: AuthService
  ) {}

  ngOnInit(): void {
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
    formData.append("file", this.file);

    this.usersService.uploadDocumentPhoto(formData).subscribe(
      (photo: PhotoFile) => {
        this.newAvatar = photo;
        console.log(this.as.getRuleId(Role.CLIENT));

        this.notification.notify({
          message: "Documento enviado",
          type: Types.SUCCESS,
        });
      },
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

  updateClient() {
    this.usersService
      .updateClientDoc(this.as.getRuleId(Role.CLIENT), this.newAvatar)
      .subscribe({
        error: () =>
          this.notification.notify({
            message: "Falha ao atualizar documento",
            type: Types.ERROR,
            timer: 2000,
          }),
        next: () => {
          this.notification.notify({
            message: "Documento salvo",
            type: Types.SUCCESS,
          });
        },
      });
  }

  delete(id: any): void | boolean {
    if (id === null || id === undefined) {
      return false;
    }
    this.usersService.deleteDocumentPhoto(id).subscribe(
      () => {
        if (this.newAvatar !== null && id === this.newAvatar.id) {
          this.newAvatar = null;
          this.preview = null;
        }
      },
      () => {
        this.notification.notify({
          message: "Erro ao tentar deletar documento =(",
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
      this.delete(this.newAvatar.id);
    }

    this.router.navigate(["profile", this.userId]);
  }
}
