import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../auth/auth.service";

import { faLock, faAt, faUser } from "@fortawesome/free-solid-svg-icons";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { User } from "src/app/auth/models/user.model";
import { Role } from "src/app/auth/enums/roles-types";

@Component({
  selector: "app-edit-address",
  templateUrl: "./edit-address.component.html",
  styleUrls: ["./edit-address.component.scss"],
})
export class EditAddressComponent implements OnInit {
  addressForm: FormGroup;
  loading: boolean = false;
  rememberme: boolean = false;
  navigateTo: string;

  faLock = faLock;
  faAt = faAt;
  faUser = faUser;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      cep: this.fb.control("", [Validators.required]),
      streetName: this.fb.control("", [Validators.required]),
      houseNumber: this.fb.control("", [Validators.required]),
      complement: this.fb.control("", [Validators.required]),
      neighborhood: this.fb.control("", [Validators.required]),
      city: this.fb.control("", [Validators.required]),
      fu: this.fb.control("", [Validators.required]),
    });
  }
}
