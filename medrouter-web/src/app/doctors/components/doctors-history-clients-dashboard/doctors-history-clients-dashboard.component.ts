import { Component, OnInit } from "@angular/core";
import {
  faChevronLeft,
  faChevronRight,
  faSquare,
  faCheckSquare,
  faEdit,
  faTimes,
  faShareSquare,
  faSave,
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
  faFileMedicalAlt,
  faMobileAlt,
  faUserTie,
  faMedkit,
  faTachometerAlt,
  faWeight,
  faHeart,
  faRulerVertical,
  faRulerHorizontal,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { ExamDto } from "../../model/exam";

import { format } from "date-fns";
import { PrescriptionDto } from "../../model/prescription";

import { DoctorsService } from "../../doctors.service";
import { NotificationService } from "src/app/messages/notification.service";

import { ActivatedRoute } from "@angular/router";
import { Types } from "src/app/messages/toast/enums/types";
import { Client } from "../../model/client";
import getStatusColor from "src/app/utils/getStatusColor";

@Component({
  selector: "app-doctors-history-clients-dashboard",
  templateUrl: "./doctors-history-clients-dashboard.component.html",
  styleUrls: ["./doctors-history-clients-dashboard.component.scss"],
})
export class DoctorsHistoryClientsDashboardComponent implements OnInit {
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
  faFileMedicalAlt = faFileMedicalAlt;
  faMobileAlt = faMobileAlt;
  faUserTie = faUserTie;
  faMedkit = faMedkit;
  faClipBoard = faClipboard;

  faTachometerAlt = faTachometerAlt;
  faWeight = faWeight;
  faHeart = faHeart;
  faRulerVertical = faRulerVertical;
  faRulerHorizontal = faRulerHorizontal;

  showSearch: boolean = false;

  exams: Array<ExamDto> = [];

  prescriptions: Array<PrescriptionDto>;

  page: number = 1;

  clients: Client[] = [];

  client: Client;

  count: number = 0;

  constructor(
    private ds: DoctorsService,
    private ns: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe({
      next: (params) => this.getPrescriptions(params["id"]),
    });
  }

  getPrescriptions(id: string, username?: string) {
    this.ds
      .getPrescriptions(id, {
        page: this.page,
        username: username,
      })
      .subscribe({
        error: () =>
          this.ns.notify({
            message: "Falha ao consultar histórico",
            type: Types.ERROR,
          }),
        next: (prescriptions: PrescriptionDto[]) => {
          this.prescriptions = [
            ...prescriptions.map((pres) => {
              pres.visible = false;
              pres.recomendations = pres.recomendations;
              return pres;
            }),
          ];
        },
      });
  }

  toogle() {
    this.showSearch = !this.showSearch;
  }

  search(username: string) {
    this.ds
      .getClients(this.activatedRoute.parent.snapshot.params["id"], username)
      .subscribe({
        next: (clients: Client[]) => (this.clients = clients),
      });
  }

  pretty(date: Date): string {
    if (date !== undefined) return format(new Date(date), "dd/MM/yyyy");
  }

  fmrt(name: string) {
    const newSentece = name.replace(/_/g, " ").toLowerCase();
    return newSentece[0].toUpperCase() + newSentece.slice(1);
  }

  pageUp() {
    this.page += 1;
    this.getPrescriptions(this.activatedRoute.parent.snapshot.params["id"]);
  }
  pageDown() {
    this.page = this.page > 1 ? this.page - 1 : 1;
    this.getPrescriptions(this.activatedRoute.parent.snapshot.params["id"]);
  }

  arrayFromObject(data: any): String[] {
    if (Object.values(data).length === 0) {
      return undefined;
    } else {
      return data.replace("{", "").replace("}", "").split(",");
    }
  }

  save(client: Client) {
    this.client = client;

    this.showSearch = false;

    this.getPrescriptions(
      this.activatedRoute.parent.snapshot.params["id"],
      client.user.username
    );
  }

  clear() {
    this.client = undefined;
    this.page = 1;
    this.getPrescriptions(this.activatedRoute.parent.snapshot.params["id"]);
  }

  getStatusColors = getStatusColor;
}
