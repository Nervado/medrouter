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

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Client } from "src/app/clients/models/client";
import { LaboratoriesService } from "../../laboratories.service";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { SearchClientDto } from "../../dtos/search-client.dto";
import getStatusColor from "src/app/utils/getStatusColor";
import { DocDto } from "../../dtos/doc-dto";
import { ExamDto } from "../../dtos/exam";

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
  userId: string;

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

    this.docForm = this.fb.group({
      file: [null, Validators.required],
    });
  }

  unlock(id: string) {
    this.ls
      .changeStatus(id, {
        status: ExamStatus.CONCLUDED,
      })
      .subscribe({
        next: () => {
          this.ns.notify({
            message: "Exame enviado",
            type: Types.SUCCESS,
          });

          this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
            username: this.client ? this.client.user.username : "",
            page: this.page,
          });
        },
        error: () =>
          this.ns.notify({
            message: "Falha ao enviar exame",
            type: Types.ERROR,
          }),
      });
  }

  search(username: string, page?: number) {
    this.ls
      .getClients(this.activatedRoute.parent.snapshot.params["id"], {
        username: username,
        page: page ? page : 1,
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

  handleChange(event, exam: ExamDto, type: boolean, username?: string) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;
      reader.readAsDataURL(file);
      this.cd.markForCheck();
      this.upload(type, exam, username);
    }
  }

  upload(type: boolean, exam: ExamDto, username?: string) {
    let formData: FormData = new FormData();
    formData.append("file", this.file);

    this.ls.uploadPdfOrPhoto(formData, type).subscribe({
      next: (file: DocDto) => {
        //update exam
        if (type) {
          exam.docs = [file];
        } else {
          exam.photos = [file];
        }

        this.ls.updateExamDocuments(exam.id, exam).subscribe({
          next: () => {
            this.ns.notify({
              message: "Resultados atualizados com sucesso",
              type: Types.SUCCESS,
            });
            this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
              page: this.page,
              username: this.client ? this.client.user.username : undefined,
            });
          },
          error: () => {
            this.ns.notify({
              message: "Falha ao atualizar exame",
              type: Types.ERROR,
            });
          },
        });
      },
      error: () =>
        this.ns.notify({
          message:
            "Tamanho máximo: 2 MB, Tipos aceitos: .jpg, .jpeg, .png, ou .pdf!",
          type: Types.OPOSITY1,
          timer: 4000,
        }),
    });
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

  cancel(id: string) {
    this.ls
      .changeStatus(id, {
        status: ExamStatus.CANCELED,
      })
      .subscribe({
        next: () => {
          this.ns.notify({
            message: "Execução cancelada",
            type: Types.WARN,
          });
          this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
            username: this.client ? this.client.user.username : "",
            page: this.page,
          });
        },
        error: () =>
          this.ns.notify({
            message: "Remova todos os resultados para cancelar o exame",
            type: Types.ERROR,
          }),
      });
  }

  removeResult(id: string, type: boolean) {
    this.ls.deleteResult(id, type).subscribe({
      next: () => {
        this.ns.notify({
          message: "Arquivo excluído",
          type: Types.INFO,
        });
        this.getExams(this.activatedRoute.parent.snapshot.params["id"], {
          page: this.page,
          username: this.client ? this.client.user.username : undefined,
        });
      },
      error: () =>
        this.ns.notify({
          message: "Falha ao excluir arquivo",
          type: Types.ERROR,
        }),
    });
  }
}
