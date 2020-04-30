import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  faUser,
  faCameraRetro,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { UsersService } from "../../users.service";
import { Avatar } from "../../models/avatar.dto";

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

  file: any = { preview: "", raw: "" };

  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.avatar = this.usersService.getUserProfile().avatar;
  }

  send() {}

  handleUpload(e) {
    const data = new FormData();

    data.append("avatar", e.target.files[0]);

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

  handleChange(e) {
    //setImage({
    // preview: URL.createObjectURL(e.target.files[0]),
    //raw: e.target.files[0],
    //});

    this.handleUpload(e);
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
