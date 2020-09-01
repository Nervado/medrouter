import { Component, OnInit } from "@angular/core";

import getStatusColor from "../../../utils/getStatusColor";

import {
  faShareSquare,
  faSquare,
  faCheckSquare,
  faEdit,
  faSave,
  faCalendarPlus,
  faChevronLeft,
  faChevronRight,
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
  faCoins,
  faFileDownload,
  faCalendarDay,
  faPaperPlane,
  faLock,
  faLockOpen,
  faClock,
  faMobileAlt,
  faUserTie,
  faCameraRetro,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ExamDto } from "../../model/exam";
import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { ExamStatus } from "../../enums/status.enum";
import { format, isThisQuarter, parseISO, addDays } from "date-fns";
import { EmailValidator } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DoctorsService } from "../../doctors.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { ClientDto } from "src/app/receptionists/dtos/client-dto";
import { Client } from "src/app/clients/models/client";

@Component({
  selector: "app-doctors-exams-dashboard",
  templateUrl: "./doctors-exams-dashboard.component.html",
  styleUrls: ["./doctors-exams-dashboard.component.scss"],
})
export class DoctorsExamsDashboardComponent implements OnInit {
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
  faMobileAlt = faMobileAlt;
  faVial = faVial;
  faUserMd = faUserMd;

  faBox = faBox;
  faPlusCircle = faPlusCircle;
  faCalendarPlus = faCalendarPlus;
  faCalendarDay = faCalendarDay;
  faCoins = faCoins;
  faFileDownload = faFileDownload;
  faSend = faPaperPlane;
  faClock = faClock;
  faUserTie = faUserTie;
  faCameraRetro = faCameraRetro;
  faTrash = faTrash;

  faLock = faLock;
  faLockOpen = faLockOpen;

  lock = false;

  showSearch: boolean = false;

  exams: ExamDto[] = [];

  page: number = 1;

  clients: Client[];
  client: Client;

  getStatusColor = getStatusColor;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ds: DoctorsService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params) =>
      this.getExams(params["id"])
    );
  }

  getExams(id: string, username?: string) {
    this.ds
      .getExams(id, {
        page: this.page,
        username: username,
      })
      .subscribe({
        next: (exams: ExamDto[]) => (this.exams = exams),
        error: () =>
          this.ns.notify({
            message: "Falha ao obter exames",
            type: Types.WARN,
          }),
      });
  }

  unlock(exam: ExamDto) {
    this.ds.patchExam(exam.doctor.id, exam.id).subscribe({
      next: () => {
        this.ns.notify({
          message: "Exame enviado ao paciente",
          type: Types.SUCCESS,
        });

        this.getExams(
          this.activatedRoute.parent.snapshot.params["id"],
          this.client ? this.client.user.username : ""
        );
      },
      error: () =>
        this.ns.notify({
          message: "Não foi possível liberar este exame.",
          type: Types.ERROR,
        }),
    });
  }

  toogle() {
    this.showSearch = !this.showSearch;
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

  save(client: Client) {
    this.showSearch = false;
    this.client = client;
    this.page = 1;
    this.getExams(
      this.activatedRoute.parent.snapshot.params["id"],
      client.user.username
    );
  }

  clear() {
    this.client = undefined;
    this.page = 1;
    this.getExams(this.activatedRoute.parent.snapshot.params["id"]);
  }

  search(username: string) {
    this.ds
      .getClients(this.activatedRoute.parent.snapshot.params["id"], username)
      .subscribe({
        next: (clients: Client[]) => (this.clients = clients),
      });
  }

  pageUp() {
    this.page += 1;
    this.getExams(
      this.activatedRoute.parent.snapshot.params["id"],
      this.client ? this.client.user.username : ""
    );
  }

  pageDown() {
    this.page = this.page > 1 ? this.page - 1 : 1;
    this.getExams(
      this.activatedRoute.parent.snapshot.params["id"],
      this.client ? this.client.user.username : ""
    );
  }

  deleteExam(id: string) {
    this.ds.deleteExam(id).subscribe({
      next: () => {
        this.ns.notify({
          message: "Exame excluido",
          type: Types.INFO,
        });
        this.getExams(
          this.activatedRoute.parent.snapshot.params["id"],
          this.client ? this.client.user.username : ""
        );
      },
      error: () => {
        this.ns.notify({
          message: "Falha ao tentar excluir exame",
          type: Types.ERROR,
        });
      },
    });
  }
}
