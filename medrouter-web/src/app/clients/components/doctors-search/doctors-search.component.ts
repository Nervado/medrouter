import { Component, OnInit } from "@angular/core";
import {
  faEllipsisH,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faFilter,
  faUserMd,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

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
  faSearch = faSearch;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faFilter = faFilter;
  faUserMd = faUserMd;
  faStar = faStar;

  stars = [1, 2, 3, 4, 5, 6];
  searchForm: FormGroup;

  searchResult: Array<Doctor> = [];

  filter: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: this.fb.control(""),
    });
  }

  showFilter() {
    this.filter = !this.filter;
  }

  handleSearch() {
    this.clientsService
      .search(this.searchForm.value)
      .subscribe((doctors) => (this.searchResult = doctors));
  }
}
