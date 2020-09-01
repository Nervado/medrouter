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
} from "@fortawesome/free-solid-svg-icons";
import { ExamDto } from "src/app/doctors/model/exam";
import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { ExamStatus } from "src/app/doctors/enums/status.enum";
import { format } from "date-fns";

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

  faLock = faLock;
  faLockOpen = faLockOpen;

  lock = false;

  showSearch: boolean = false;

  exams: Array<ExamDto> = [];

  constructor() {}

  ngOnInit(): void {
    this.exams = [];
  }

  unlock(exam: ExamDto) {
    this.lock = true;

    this.exams = this.exams.map((exam) => {
      if (exam.status === ExamStatus.CONCLUDED) {
        exam.status = ExamStatus.AVAILABLE;
      }
      return exam;
    });

    console.log(exam);
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
}
