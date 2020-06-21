import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import {
  faSearch,
  faFilter,
  faUserMd,
  faUser,
  faChevronLeft,
  faChevronRight,
  faStar,
  faCog,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup } from "@angular/forms";
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
      checked: this.fb.control(""),
      username: this.fb.control(""),
    });

    this.ar.data.subscribe((data) => (this.mainColor = data.mainColor));
    this.find(1);
  }

  find(page: number) {
    this.usersService
      .searchByName({ ...this.searchForm.value, page })
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
    this.page += 1;
    this.find(this.page);
  }
  pageDown() {
    if (this.page === 1) {
      this.page = 1;
    } else {
      this.page -= 1;
      this.find(this.page);
    }
  }

  search() {
    this.find(1);
  }

  confirm(event: ActionForm) {
    if (event.type === TypeActions.EXCLUDE) {
      this.usersService.delete(this.profile.userId).subscribe({
        next: () =>
          this.ns.notify({
            message: "Usuário excluído",
            type: Types.WARN,
          }),
        error: (error) => {
          if (error.error.statusCode === 403) {
            this.ns.notify({
              message: "Usuário possuí funções ativas!",
              type: Types.ERROR,
              timer: 3000,
            });
          } else {
            this.ns.notify({
              message: "Falha ao tentar excluir usuário",
              type: Types.ERROR,
            });
          }
        },
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
  }

  showModalActions(modal: any, profile: Profile) {
    this.profile = profile;
    modal.open();
  }
}
