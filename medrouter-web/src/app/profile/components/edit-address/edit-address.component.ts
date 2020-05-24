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
import { CepService } from "../../cep.service";
import { log } from "util";

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
    private router: Router,
    private cep: CepService
  ) {}

  ngOnInit(): void {
    this.address = this.usersService.getUserProfile()?.address;
    this.userId = this.activeRoute.parent.snapshot.params["id"];
    console.log(this.userId);

    this.addressForm = this.fb.group({
      cep: this.fb.control(this.address?.cep, [
        Validators.required,
        Validators.pattern(/(\d{5})-(\d{3})/g),
      ]),
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
    this.markAllasTouched();

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
          message: "Prencha todos os campos",
          type: Types.ERROR,
        }),
      () => this.router.navigate(["profile", this.userId])
    );
  }

  getCep(cep: string) {
    return this.cep.get(parseInt(cep.replace(/\D/, ""))).subscribe((cep) => {
      this.addressForm.patchValue({
        streetName: cep.logradouro,
        city: cep.localidade,
        fu: cep.uf,
        neighborhood: cep.bairro,
        cep: cep.cep,
      });
      this.markAllasTouched();
    });
  }

  markAllasTouched() {
    Object.keys(this.addressForm.controls).forEach((field) => {
      const control = this.addressForm.get(field);
      control.markAllAsTouched();
    });
  }
}
