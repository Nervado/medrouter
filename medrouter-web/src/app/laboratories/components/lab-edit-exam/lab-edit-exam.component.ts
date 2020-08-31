import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  faSearch,
  faShareSquare,
  faCheckSquare,
  faChevronRight,
  faChevronLeft,
  faSquare,
  faFileMedical,
  faEdit,
  faTimes,
  faSave,
  faFlask,
  faExclamationCircle,
  faCapsules,
  faVial,
  faPlusCircle,
  faHeartbeat,
  faUserMd,
  faBox,
  faCalendarPlus,
  faCalendarDay,
  faCoins,
  faFileDownload,
  faPaperPlane,
  faFileMedicalAlt,
  faLock,
  faLockOpen,
  faPlus,
  faMinus,
  faUserTie,
  faMobileAlt,
  faClock,
  faTrash,
  faCameraRetro,
  faFileImage,
  faFileUpload,
} from "@fortawesome/free-solid-svg-icons";
import { ExamStatus } from "src/app/doctors/enums/status.enum";
import { format, parseISO, addDays } from "date-fns";
import { ExamDto } from "src/app/doctors/model/exam";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Client } from "src/app/clients/models/client";
import { LaboratoriesService } from "../../laboratories.service";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { SearchClientDto } from "../../dtos/search-client.dto";
import getStatusColor from "src/app/utils/getStatusColor";
import { ExamsEnum } from "src/app/doctors/enums/exams-types";

@Component({
  selector: "app-lab-edit-exam",
  templateUrl: "./lab-edit-exam.component.html",
  styleUrls: ["./lab-edit-exam.component.scss"],
})
export class LabEditExamComponent implements OnInit {
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
  faPlus = faPlus;
  faMinus = faMinus;
  faUserTie = faUserTie;
  faTrash = faTrash;
  faCameraRetro = faCameraRetro;
  faFileImage = faFileImage;
  faFileUpload = faFileUpload;

  faLock = faLock;
  faLockOpen = faLockOpen;
  faMobileAlt = faMobileAlt;
  faClock = faClock;

  exams: ExamDto[] = [];

  showSearch: boolean = false;

  clients: Client[];
  client: Client;

  lock: boolean = false;

  page: number = 1;

  formResult: FormGroup;

  avatar: any;
  newAvatar: any = undefined;
  preview: string | ArrayBuffer;
  formFile: FormGroup;
  docForm: FormGroup;

  file: File;
  userId: any;

  toogle() {
    this.showSearch = !this.showSearch;
  }

  getStatusColor = getStatusColor;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private ls: LaboratoriesService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params) =>
      this.getExams(params["id"], { page: this.page })
    );

    this.formResult = this.fb.group({
      file: [null, Validators.required],
    });

    this.docForm = this.fb.group({
      file: [null, Validators.required],
    });
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

  search(username: string) {
    this.ls
      .getClients(this.activatedRoute.parent.snapshot.params["id"], {
        username: username,
        page: 1,
      })
      .subscribe({
        next: (clients: Client[]) => (this.clients = clients),
      });
  }

  pretty(date: Date, diff?: number): string {
    if (diff && diff > 0) {
      return format(addDays(new Date(), diff), "dd/MM/yyyy");
    } else {
      return format(parseISO(date.toString()), "dd/MM/yyyy");
    }
  }

  handleChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formResult.patchValue({
          avatar: reader.result,
        });
        this.preview = reader.result;
      };

      this.cd.markForCheck();
      this.upload();
    }
  }

  upload() {
    let formData: FormData = new FormData();
    formData.append("avatar", this.file);

    /**

    this.usersService.uploadAvatar(formData).subscribe(
      (avatar: Avatar) => (this.newAvatar = avatar),
      () => {
        this.notification.notify({
          message:
            "Tamanho máximo: 2 MB, Tipos aceitos: .jpg, .jpeg, .png, ou .gif!",
          type: Types.OPOSITY1,
          timer: 4000,
        });
        this.preview = "";
      }
    );

     */
  }

  fmrt(name: string) {
    const newSentece = name.replace(/_/g, " ").toLowerCase();
    return newSentece[0].toUpperCase() + newSentece.slice(1);
  }

  clear() {
    this.client = undefined;
    this.page = 1;
    this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
      page: this.page,
    });
  }

  pageUp() {
    this.page += 1;
    this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
      username: this.client ? this.client.user.username : "",
      page: this.page,
    });
  }

  pageDown() {
    this.page = this.page > 1 ? this.page - 1 : 1;
    this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
      username: this.client ? this.client.user.username : "",
      page: this.page,
    });
  }

  getExams(id: string, search?: SearchClientDto) {
    this.ls.getExams(id, search).subscribe({
      next: (exams: ExamDto[]) => (this.exams = exams),
      error: () =>
        this.ns.notify({
          message: "Falha ao obter exames",
          type: Types.WARN,
        }),
    });
  }

  save(client: Client) {
    this.showSearch = false;
    this.client = client;
    this.page = 1;
    this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
      username: this.client ? this.client.user.username : "",
      page: this.page,
    });
  }
}
