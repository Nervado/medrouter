import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  faEllipsisH,
  faSearch,
  faPlus,
  faFlask,
  faEdit,
  faTimes,
  faCalendarPlus,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Doctor } from "src/app/clients/models/doctor";
import { ClientsService } from "src/app/clients/clients.service";
import { LabDto } from "../lab-remove-confirmation/dtos/lab.dto";
import { ExamsEnum } from "../add-lab-modal/enums/exams-types";

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

  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  faPlus = faPlus;
  faFlask = faFlask;
  faEdit = faEdit;
  faTimes = faTimes;
  faCalendarPlus = faCalendarPlus;

  faUserEdit = faUserEdit;

  lab: LabDto = {
    name: "labA+",
    id: "757hg92ogw",
    cnpj: "46588590606/47845",
    exams: [ExamsEnum.ABDMO, ExamsEnum.HMGRA, ExamsEnum.ANTBI],
    users: [
      { userId: 1, username: "Jorge", addin: new Date() },
      { userId: 2, username: "Lucas", addin: new Date() },
      { userId: 3, username: "Pedro", addin: new Date() },
      { userId: 4, username: "Agnelo", addin: new Date() },
      { userId: 5, username: "Jose", addin: new Date() },
    ],
  };

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

  confirm(e) {
    console.log(e);
  }

  openModal(modal: any) {
    modal.open();
  }

  removeLab(modal: any, data?: any) {
    //this.lab ;
    modal.open();
  }

  remove(e) {
    console.log(e);
  }

  addUserLab(addUserLabModal) {
    addUserLabModal.open();
  }
  addUser(e) {
    console.log(e);
  }

  editExams(editExamsModal) {
    editExamsModal.open();
  }
}
