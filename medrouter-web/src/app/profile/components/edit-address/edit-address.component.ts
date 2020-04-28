import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../auth/auth.service";

import {
  faLock,
  faAt,
  faUser,
  faHome,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { User } from "src/app/auth/models/user.model";
import { Role } from "src/app/auth/enums/roles-types";
import { Profile } from "../../models/user-profile";
import { Address } from "../../models/address";
import { UsersService } from "../../users.service";

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
  faHome = faHome;
  faRoad = faRoad;

  address: Address = null;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,

    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.address = this.usersService.getUserProfile().address;
    this.addressForm = this.fb.group({
      cep: this.fb.control(this.address?.cep, [Validators.required]),
      streetName: this.fb.control(this.address?.streetName, [
        Validators.required,
      ]),
      houseNumber: this.fb.control(this.address?.houseNumber, [
        Validators.required,
      ]),
      complement: this.fb.control(this.address?.complement, [
        Validators.required,
      ]),
      neighborhood: this.fb.control(this.address?.neighborhood, [
        Validators.required,
      ]),
      city: this.fb.control(this.address?.city, [Validators.required]),
      fu: this.fb.control(this.address?.fu, [Validators.required]),
    });
  }

  send() {
    console.log(this.addressForm.value);
  }
}
