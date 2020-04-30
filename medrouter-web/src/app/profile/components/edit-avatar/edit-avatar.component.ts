import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  faUser,
  faCameraRetro,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { UsersService } from "../../users.service";
import { Avatar } from "../../models/avatar.dto";
import { PhotoFile } from "../../models/file.dto";

@Component({
  selector: "app-edit-avatar",
  templateUrl: "./edit-avatar.component.html",
  styleUrls: ["./edit-avatar.component.scss"],
})
export class EditAvatarComponent implements OnInit {
  securityForm: FormGroup;
  faUser = faUser;
  faCameraRetro = faCameraRetro;
  faTrash = faTrash;

  avatar: Avatar;

  newAvatar: Avatar = undefined;

  preview: string | ArrayBuffer;

  formFile: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.avatar = this.usersService.getUserProfile().avatar;

    this.preview = null;

    this.formFile = this.fb.group({
      file: [null, Validators.required],
    });
  }

  send() {}

  handleUpload(e) {
    // action
    /**
     *  try {
      const response = await api.post("avatars", data);
      toast.info("Avatar atualizado", { className: "success" });
      setFile(response.data);
    } catch (error) {
      setImage({ preview: "", raw: "" });
      toast.error(
        "A sua foto deve ter no máximo 2 MB e ser do tipo .jpg, .jpeg, .png, ou .gif!"
      );
    }
     */
  }

  handleChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formFile.patchValue({
          avatar: reader.result,
        });
        this.preview = reader.result;
      };

      this.cd.markForCheck();
    }
  }

  handleClick() {
    /**
    setImage({ preview: "", raw: "" });
    if (!file) return;
    try {
      await api.delete(`avatars/${file.avatarId}`);
      setFile(null);

      toast.warn("Foto deletada");
    } catch (error) {
      toast.error("Falha ao deletar foto");
    }
     */
  }
}
