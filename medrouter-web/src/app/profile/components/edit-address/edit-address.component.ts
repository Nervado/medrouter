import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {
  faLock,
  faAt,
  faUser,
  faHome,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";

import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
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

  userId: any;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.address = this.usersService.getUserProfile()?.address;
    this.userId = this.activeRoute.parent.snapshot.params["id"];

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
    const updatedUserWithAddress = this.usersService.getUserProfile();
    updatedUserWithAddress.address = this.addressForm.value;
    console.log(updatedUserWithAddress);

    this.usersService.update(updatedUserWithAddress, this.userId).subscribe(
      () =>
        this.notificationService.notify({
          message: "Endereço Atualizado com sucesso",
          type: Types.BASE,
        }),
      () =>
        this.notificationService.notify({
          message: "Algo deu Errado =(",
          type: Types.ERROR,
        }),
      () => this.router.navigate(["profile", this.userId])
    );
  }
}
