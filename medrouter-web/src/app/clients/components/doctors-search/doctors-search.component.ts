import { Component, OnInit } from "@angular/core";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormControlName,
} from "@angular/forms";

import { ClientsService } from "../../clients.service";
import { Doctor } from "../../models/doctor";

@Component({
  selector: "app-doctors-search",
  templateUrl: "./doctors-search.component.html",
  styleUrls: ["./doctors-search.component.scss"],
})
export class DoctorsSearchComponent implements OnInit {
  faEllipsisH = faEllipsisH;

  searchForm: FormGroup;

  searchResult: Array<Doctor> = [];

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: this.fb.control(""),
    });
  }

  handleSearch() {
    this.clientsService
      .search(this.searchForm.value)
      .subscribe((doctors) => (this.searchResult = doctors));
  }
}
