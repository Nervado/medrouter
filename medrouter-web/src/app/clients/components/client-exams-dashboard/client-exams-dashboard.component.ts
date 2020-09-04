import { Component, OnInit } from "@angular/core";
import {
  faSave,
  faShareSquare,
  faChevronLeft,
  faChevronRight,
  faSquare,
  faCheckSquare,
  faEdit,
  faTimes,
  faSearch,
  faFlask,
  faFileMedical,
  faCapsules,
  faVial,
  faExclamationCircle,
  faUserMd,
  faHeartbeat,
  faBox,
  faPlusCircle,
  faCalendarPlus,
  faCalendarDay,
  faCoins,
  faFileDownload,
  faPaperPlane,
  faLock,
  faLockOpen,
  faMobileAlt,
  faClock,
  faCameraRetro,
} from "@fortawesome/free-solid-svg-icons";

import { format, addDays, parseISO } from "date-fns";
import { Doctor } from "../../models/doctor";
import { ActivatedRoute } from "@angular/router";
import { ClientsService } from "../../clients.service";
import { Types } from "src/app/messages/toast/enums/types";
import { SearchDoctorDto } from "../../models/search";
import { NotificationService } from "src/app/messages/notification.service";
import getStatusColor from "src/app/utils/getStatusColor";
import { ExamDto } from "../../models/exam";

@Component({
  selector: "app-client-exams-dashboard",
  templateUrl: "./client-exams-dashboard.component.html",
  styleUrls: ["./client-exams-dashboard.component.scss"],
})
export class ClientExamsDashboardComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;
  faEdit = faEdit;
  faTimes = faTimes;
  faShare = faShareSquare;
  faSave = faSave;
  faSearch = faSearch;
  faFlask = faFlask;
  faFileMedical = faFileMedical;
  faCapsules = faCapsules;
  faVial = faVial;
  faExclamationCircle = faExclamationCircle;
  faUserMd = faUserMd;
  faHeartbeat = faHeartbeat;
  faBox = faBox;
  faPlusCircle = faPlusCircle;
  faCalendarPlus = faCalendarPlus;
  faCalendarDay = faCalendarDay;
  faCoins = faCoins;
  faFileDownload = faFileDownload;
  faSend = faPaperPlane;
  faMobileAlt = faMobileAlt;
  faClock = faClock;
  faLock = faLock;
  faLockOpen = faLockOpen;
  faCameraRetro = faCameraRetro;

  lock = false;

  showSearch: boolean = false;

  exams: Array<ExamDto> = [];

  doctor: Doctor;
  doctors: Doctor[];

  page: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ClientsService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params) =>
      this.getExams(params["id"], { page: this.page })
    );
  }

  toogle() {
    this.showSearch = !this.showSearch;
  }

  clear() {
    this.doctor = undefined;
    this.page = 1;
    this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
      page: this.page,
    });
  }

  search(username: string, page?: number) {
    this.cs
      .search({
        username: username,
        page: page ? page : 1,
      })
      .subscribe({
        next: (doctors: Doctor[]) => (this.doctors = doctors),
      });
  }

  pretty(date: Date, diff?: number): string {
    if (diff && diff > 0) {
      return format(addDays(new Date(), diff), "dd/MM/yyyy");
    } else {
      return format(parseISO(date.toString()), "dd/MM/yyyy");
    }
  }

  fmrt(name: string) {
    const newSentece = name.replace(/_/g, " ").toLowerCase();
    return newSentece[0].toUpperCase() + newSentece.slice(1);
  }

  pageUp() {
    this.page += 1;
    this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
      username: this.doctor ? this.doctor.user.username : "",
      page: this.page,
    });
  }

  pageDown() {
    this.page = this.page > 1 ? this.page - 1 : 1;
    this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
      username: this.doctor ? this.doctor.user.username : "",
      page: this.page,
    });
  }

  getExams(id: string, search?: SearchDoctorDto) {
    this.cs.getExams(id, search).subscribe({
      next: (exams: ExamDto[]) => (this.exams = exams),
      error: () =>
        this.ns.notify({
          message: "Falha ao obter lista de exames",
          type: Types.WARN,
        }),
    });
  }

  save(doctor: Doctor) {
    this.showSearch = false;
    this.doctor = doctor;
    this.page = 1;
    this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
      username: this.doctor ? this.doctor.user.username : "",
      page: this.page,
    });
  }

  getStatusColor = getStatusColor;
}
