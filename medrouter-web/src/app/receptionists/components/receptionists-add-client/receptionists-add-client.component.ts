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

  constructor(private fb: FormBuilder) {}

  showModal(modal) {
    modal.open();
  }
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: this.fb.control("", [Validators.required]),
      surname: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required, Validators.email]),
      cpf: this.fb.control("", [Validators.required]),
      phoneNumber: this.fb.control("", [Validators.required]),
    });
  }
}
