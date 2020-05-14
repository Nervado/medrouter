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
} from "@fortawesome/free-solid-svg-icons";
import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { ExamStatus } from "src/app/doctors/enums/status.enum";
import { format } from "date-fns";
import { ExamDto } from "src/app/doctors/model/exam";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

  faLock = faLock;
  faLockOpen = faLockOpen;

  exams;

  showSearch: boolean = false;

  lock: boolean = false;

  formResult: FormGroup;

  avatar: any;
  newAvatar: any = undefined;
  preview: string | ArrayBuffer;
  formFile: FormGroup;
  file: File;
  userId: any;

  toogle() {
    this.showSearch = !this.showSearch;
  }

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log("estou aqui");

    this.formResult = this.fb.group({
      file: [null, Validators.required],
    });

    this.exams = [
      {
        id: 12,
        price: 200,
        type: ExamsEnum.ABDMO,
        doctor: {
          id: 123,
          user: { fullname: "Paulo Bessa" },
        },
        status: ExamStatus.CONCLUDED,
        docs: [
          {
            id: 435,
            url: "https://api.adorable.io/avatars/50/abott@adorable.png",
          },
        ],
        lab: {
          id: 122,
          name: "LabA+",
        },
        client: {
          id: 264,
          user: {
            fullname: "Pedro da Silva",
            avatar: {
              url: "https://api.adorable.io/avatars/50/abott@adorable.png",
            },
          },
        },
        createdAt: new Date(),
      },

      {
        id: 12,
        price: 200,
        type: ExamsEnum.ABDMO,
        doctor: {
          id: 123,
          user: { fullname: "Paulo Bessa" },
        },
        status: ExamStatus.AVAILABLE,
        docs: [
          {
            id: 435,
            url: "https://api.adorable.io/avatars/50/abott@adorable.png",
          },
        ],
        lab: {
          id: 122,
          name: "LabA+",
        },
        client: {
          id: 264,
          user: {
            fullname: "Pedro da Silva",
            avatar: {
              url: "",
            },
          },
        },
        createdAt: new Date(),
      },

      {
        id: 12,
        price: 200,
        type: ExamsEnum.ABDMO,
        doctor: {
          id: 123,
          user: { fullname: "Paulo Bessa" },
        },
        status: ExamStatus.CANCELED,
        docs: [
          {
            id: 435,
            url: "https://api.adorable.io/avatars/50/abott@adorable.png",
          },
        ],
        lab: {
          id: 122,
          name: "LabA+",
        },
        client: {
          id: 264,
          user: {
            fullname: "Pedro da Silva",
            avatar: {
              url: "",
            },
          },
        },
        createdAt: new Date(),
      },

      {
        id: 12,
        price: 200,
        type: ExamsEnum.ABDMO,
        doctor: {
          id: 123,
          user: { fullname: "Paulo Bessa" },
        },
        status: ExamStatus.AVAILABLE,
        docs: [
          {
            id: 435,
            url: "https://api.adorable.io/avatars/50/abott@adorable.png",
          },
        ],
        lab: {
          id: 122,
          name: "LabA+",
        },
        client: {
          id: 264,
          user: {
            fullname: "Pedro da Silva",
            avatar: {
              url: "",
            },
          },
        },
        createdAt: new Date(),
      },

      {
        id: 12,
        price: 200,
        type: ExamsEnum.ABDMO,
        doctor: {
          id: 123,
          user: { fullname: "Paulo Bessa" },
        },
        status: ExamStatus.AVAILABLE,
        docs: [
          {
            id: 435,
            url: "https://api.adorable.io/avatars/50/abott@adorable.png",
          },
        ],
        lab: {
          id: 122,
          name: "LabA+",
        },
        client: {
          id: 264,
          user: {
            fullname: "Pedro da Silva",
            avatar: {
              url: "",
            },
          },
        },
        createdAt: new Date(),
      },
    ];
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

  search() {
    console.log("procurando ...");
  }

  pretty(date: Date): string {
    return format(date, "dd/MM/yyyy");
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
}
