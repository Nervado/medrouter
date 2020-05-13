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
} from "@fortawesome/free-solid-svg-icons";
import { ExamDto } from "../../model/exam";
import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { ExamStatus } from "../../enums/status.enum";
import { format } from "date-fns";
import { PrescriptionDto } from "../../model/prescription";
import { Medicine } from "../../model/medicine";

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
