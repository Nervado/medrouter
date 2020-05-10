import { Component, OnInit } from "@angular/core";
import {
  faChevronLeft,
  faChevronRight,
  faSquare,
  faCheckSquare,
  faEdit,
  faShareSquare,
  faSave,
  faUserMd,
  faHeartbeat,
  faSearch,
  faFileMedical,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-doctors-create-prescription",
  templateUrl: "./doctors-create-prescription.component.html",
  styleUrls: ["./doctors-create-prescription.component.scss"],
})
export class DoctorsCreatePrescriptionComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;
  faEdit = faEdit;
  faShare = faShareSquare;
  faSave = faSave;
  faSearch = faSearch;
  faFileMedical = faFileMedical;
  isEditing: boolean = false;

  showSearch: boolean = true;

  faUserMd = faUserMd;
  faHeartbeat = faHeartbeat;

  constructor() {}

  ngOnInit(): void {}

  save() {}

  toogle() {
    this.showSearch = !this.showSearch;
  }

  search() {}
}
