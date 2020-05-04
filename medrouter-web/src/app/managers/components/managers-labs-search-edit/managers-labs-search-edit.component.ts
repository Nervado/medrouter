import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  faEllipsisH,
  faSearch,
  faPlus,
  faFlask,
  faEdit,
  faTimes,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Doctor } from "src/app/clients/models/doctor";
import { ClientsService } from "src/app/clients/clients.service";

@Component({
  selector: "app-managers-labs-search-edit",
  templateUrl: "./managers-labs-search-edit.component.html",
  styleUrls: ["./managers-labs-search-edit.component.scss"],
})
export class ManagersLabsSearchEditComponent implements OnInit {
  faEllipsisH = faEllipsisH;
  faSearch = faSearch;

  searchForm: FormGroup;

  searchResult: Array<Doctor> = [];

  faPlus = faPlus;
  faFlask = faFlask;
  faEdit = faEdit;
  faTimes = faTimes;
  faCalendarPlus = faCalendarPlus;

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
