import { Component, OnInit } from "@angular/core";
import {
  faSearch,
  faChevronLeft,
  faChevronRight,
  faSquare,
  faCheckSquare,
  faEdit,
  faTimes,
  faShareSquare,
  faSave,
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
  faFileMedicalAlt,
  faMobileAlt,
  faUserTie,
  faMedkit,
  faClipboard,
  faTachometerAlt,
  faWeight,
  faHeart,
  faRulerVertical,
  faRulerHorizontal,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { ExamDto } from "src/app/doctors/model/exam";
import { PrescriptionDto } from "src/app/doctors/model/prescription";
import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { format } from "date-fns";
import { NotificationService } from "src/app/messages/notification.service";
import { ActivatedRoute } from "@angular/router";
import { ClientsService } from "../../clients.service";
import { Doctor } from "../../models/doctor";
import { Types } from "src/app/messages/toast/enums/types";
import getStatusColor from "src/app/utils/getStatusColor";

@Component({
  selector: "app-client-history-dashboard",
  templateUrl: "./client-history-dashboard.component.html",
  styleUrls: ["./client-history-dashboard.component.scss"],
})
export class ClientHistoryDashboardComponent implements OnInit {
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
  faEye = faEye;

  faTachometerAlt = faTachometerAlt;
  faWeight = faWeight;
  faHeart = faHeart;
  faRulerVertical = faRulerVertical;
  faRulerHorizontal = faRulerHorizontal;

  showSearch: boolean = false;

  exams: Array<ExamDto> = [];

  prescriptions: Array<PrescriptionDto>;

  page: number = 1;

  doctors: Doctor[] = [];

  doctor: Doctor;

  count: number = 0;

  constructor(
    private cs: ClientsService,
    private ns: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe({
      next: (params) => this.getPrescriptions(params["id"]),
    });
  }

  getPrescriptions(id: string, username?: string) {
    this.cs
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
    this.cs
      .search({
        username: username,
        page: 1,
      })
      .subscribe({
        next: (doctors: Doctor[]) => (this.doctors = doctors),
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

  save(doctor: Doctor) {
    this.doctor = doctor;

    this.showSearch = false;

    this.getPrescriptions(
      this.activatedRoute.parent.snapshot.params["id"],
      doctor.user.username
    );
  }

  clear() {
    this.doctor = undefined;
    this.page = 1;
    this.getPrescriptions(this.activatedRoute.parent.snapshot.params["id"]);
  }

  getStatusColors = getStatusColor;
}
