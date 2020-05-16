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
} from "@fortawesome/free-solid-svg-icons";
import { ExamDto } from "src/app/doctors/model/exam";
import { PrescriptionDto } from "src/app/doctors/model/prescription";
import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { format } from "date-fns";

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

  showSearch: boolean = false;

  exams: Array<ExamDto> = [];

  prescriptions: Array<PrescriptionDto>;

  constructor() {}

  ngOnInit(): void {
    this.prescriptions = [
      {
        id: 12,
        doctor: {
          id: 12,
          user: {
            fullname: "Marcos Paulo",
            avatar: {
              url: "https://api.adorable.io/avatars/50/abott@adorable.png",
            },
          },
        },
        client: {
          id: 12,
          user: {
            fullname: "Pedro Paulo",
            avatar: {
              url: "https://api.adorable.io/avatars/50/abott@adorable.png",
            },
          },
        },
        recomendations: ["R01. Ficar em casa"],
        exams: [
          {
            id: 455,
            type: ExamsEnum.ABDMO,
          },
          {
            id: 355,
            type: ExamsEnum.ANUSC,
          },
        ],
        medicines: [
          { id: 1, substance: "acido" },
          { id: 24, substance: "fito+" },
        ],
        createdAt: new Date(),
      },
    ];
  }

  toogle() {
    this.showSearch = !this.showSearch;
  }

  search() {
    console.log("procurando ...");
  }

  pretty(date: Date): string {
    return format(date, "dd/MM/yyyy");
  }

  fmrt(name: string) {
    const newSentece = name.replace(/_/g, " ").toLowerCase();
    return newSentece[0].toUpperCase() + newSentece.slice(1);
  }
}
