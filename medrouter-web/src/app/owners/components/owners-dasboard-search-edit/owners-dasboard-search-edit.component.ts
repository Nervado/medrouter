import {
  Component,
  OnInit,
  EventEmitter,
  ElementRef,
  ViewChild,
  Output,
} from "@angular/core";
import {
  faCalendarPlus,
  faEllipsisH,
  faSearch,
  faUser,
  faPlus,
  faFlask,
  faEdit,
  faTimes,
  faCoins,
  faUserEdit,
  faUsers,
  faUserMd,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Doctor } from "src/app/clients/models/doctor";
import { ReceptionistDto } from "src/app/managers/components/managers-receptionists-dismiss-modal/dtos/receptionist-dto";
import { LabDto } from "src/app/managers/components/lab-remove-confirmation/dtos/lab.dto";
import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { ClientsService } from "src/app/clients/clients.service";

@Component({
  selector: "app-owners-dasboard-search-edit",
  templateUrl: "./owners-dasboard-search-edit.component.html",
  styleUrls: ["./owners-dasboard-search-edit.component.scss"],
})
export class OwnersDasboardSearchEditComponent implements OnInit {
  faEllipsisH = faEllipsisH;
  faSearch = faSearch;
  faUser = faUser;

  searchForm: FormGroup;

  searchResult: Array<Doctor> = [];

  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  faPlus = faPlus;
  faFlask = faFlask;
  faEdit = faEdit;
  faTimes = faTimes;
  faCalendarPlus = faCalendarPlus;
  faCoins = faCoins;
  faUserEdit = faUserEdit;
  faUsers = faUsers;
  faUserMd = faUserMd;
  faCrown = faCrown;

  receptionist: ReceptionistDto = {
    id: 1,
    salary: 2000,
    manager: null,
    ishired: true,
    hireddate: new Date(),
    dissmisdate: null,
    user: {
      userId: 2,
      username: "Maria",
      cpf: "066591174-23",
    },
  };

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

  openModal(modal?: any) {
    modal.open();
  }

  removeEmployer(modal?: any, data?: any) {
    //this.lab ;
    modal.open();
  }

  remove(modal) {
    modal.open();
  }

  addUserLab(addUserLabModal?) {
    addUserLabModal.open();
  }
  addUser(e) {
    console.log(e);
  }

  edit(modal) {
    modal.open();
  }
}
