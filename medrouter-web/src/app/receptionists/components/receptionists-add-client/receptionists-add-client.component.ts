import { Component, OnInit } from "@angular/core";
import {
  faFileMedicalAlt,
  faLock,
  faAt,
  faUser,
  faPhone,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { Colors } from "src/app/messages/toast/enums/colors";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ReceptionistsService } from "../../receptionists.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-receptionists-add-client",
  templateUrl: "./receptionists-add-client.component.html",
  styleUrls: ["./receptionists-add-client.component.scss"],
})
export class ReceptionistsAddClientComponent implements OnInit {
  faFileMedicalAlt = faFileMedicalAlt;

  signUpForm: FormGroup;
  loading: boolean = false;

  faLock = faLock;
  faAt = faAt;
  faUser = faUser;
  faPhone = faPhone;
  faAddressCard = faAddressCard;
  mainColor: Colors = Colors.RECEPT;
  examForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rs: ReceptionistsService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: this.fb.control("", [Validators.required]),
      surname: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required, Validators.email]),
      cpf: this.fb.control("", [
        Validators.required,
        Validators.maxLength(14),
        Validators.pattern(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/g),
      ]),
      phoneNumber: this.fb.control("", [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern(/(\(\d{2}\)\s)9(\d{4})-\d{4}/g),
      ]),
    });
  }
  send() {
    console.log(this.signUpForm.value);

    this.rs.addClient(this.signUpForm.value).subscribe({
      next: () =>
        this.ns.notify({
          message: "Cadastro realizado",
          type: Types.SUCCESS,
        }),
      error: () =>
        this.ns.notify({
          message: "Cadastro não concluído",
          type: Types.ERROR,
        }),
      complete: () => this.signUpForm.reset(),
    });
  }
}
