import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Type,
} from "@angular/core";
import {
  faSearch,
  faFilter,
  faUserMd,
  faUser,
  faArrowLeft,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faStar,
  faCog,
  faLocationArrow,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "src/app/profile/users.service";
import { Profile } from "src/app/profile/models/user-profile";

import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { Role } from "src/app/auth/enums/roles-types";
import { RolesIcons } from "./enums/roles-icons";
import { Colors } from "src/app/messages/toast/enums/colors";
import { ActivatedRoute } from "@angular/router";
import { TypeActions } from "./enums/actions-type";
import { OwnersService } from "../../owners.service";
import { ActionForm } from "./dtos/form-dto";

@Component({
  selector: "app-search-employees",
  templateUrl: "./search-employees.component.html",
  styleUrls: ["./search-employees.component.scss"],
})
export class SearchEmployeesComponent implements OnInit {
  profile: Profile;
  faSearch = faSearch;
  faFilter = faFilter;
  faUserMd = faUserMd;
  faUser = faUser;
  faArrowLeft = faChevronLeft;
  faArrowRight = faChevronRight;

  @ViewChild("modal") elementRef: ElementRef;

  details = RolesIcons;

  @Input() mainColor: Colors = Colors.BASE;

  page: number = 1;

  showFilter: boolean = false;
  searchForm: FormGroup;

  users: Array<Profile> = [];

  loading: boolean = false;

  faStar = faStar;
  stars = [1, 2, 3, 4, 5];
  faCog = faCog;
  faLocationArrow = faMapMarkerAlt;

  roles: Role[] = [Role.CLIENT, Role.DOCTOR, Role.OWNER];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private ns: NotificationService,
    private ar: ActivatedRoute,
    private os: OwnersService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      sex: this.fb.control(""),
      role: this.fb.control(""),
      ishired: this.fb.control(""),
      username: this.fb.control(""),
    });

    this.ar.data.subscribe((data) => (this.mainColor = data.mainColor));

    // test
    this.page = 1;
    this.getUsers(this.page);
  }

  showFilters() {
    this.showFilter = !this.showFilter;

    if (this.showFilter === false) {
      this.searchForm.patchValue({
        sex: "",
        role: "",
        ishired: "",
      });
    }
  }

  pageUp() {
    if (this.searchForm.value.username === "") {
      this.page += 1;
      this.getUsers(this.page);
    }
  }
  pageDown() {
    if (this.searchForm.value.username === "") {
      if (this.page === 1) {
        this.page = 1;
      } else {
        this.page -= 1;
        this.getUsers(this.page);
      }
    }
  }

  search() {
    this.page = 1;
    console.log({ ...this.searchForm.value, page: this.page });

    this.usersService
      .searchByName({ ...this.searchForm.value, page: this.page })
      .subscribe({
        error: () =>
          this.ns.notify({
            message: "Falha ao buscar usuários",
            type: Types.ERROR,
          }),
        next: (users: Profile[]) => {
          this.users = users;
        },
      });
  }

  getUsers(page: number) {
    this.usersService.search(page).subscribe({
      next: (Users) => {
        this.users = Users;
        console.log(this.users);
      },
      error: () =>
        this.ns.notify({
          message: "Falha ao obter usários",
          type: Types.ERROR,
        }),
    });
  }

  confirm(event: ActionForm) {
    console.log(event);

    if (event.type === TypeActions.EXCLUDE) {
      this.usersService.delete(this.profile.userId).subscribe({
        next: () =>
          this.ns.notify({
            message: "Usuário excluído",
            type: Types.WARN,
          }),
        error: () =>
          this.ns.notify({
            message: "Falha ao tentar excluir usuário",
            type: Types.ERROR,
          }),
      });
    }

    if (event.type === TypeActions.INCLUDE) {
      this.os
        .create(
          {
            salary: event.salary,
            user: {
              email: this.profile.email,
            },
            specialty: ["Clinica_medica"],
          },
          event.include
        )
        .subscribe({
          next: () =>
            this.ns.notify({
              message: "Usuário alterado com successo",
              type: Types.SUCCESS,
            }),
          error: () =>
            this.ns.notify({
              message: "Falha ao tentar alterar usuário",
              type: Types.WARN,
            }),
        });
    }

    if (event.type === TypeActions.EXCLUDE) {
    }
  }

  showModalActions(modal: any, profile: Profile) {
    this.profile = profile;
    modal.open();
    console.log(profile);
  }
}
