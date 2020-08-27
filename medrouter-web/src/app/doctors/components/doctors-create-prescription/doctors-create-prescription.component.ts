import { Component, OnInit } from "@angular/core";
import {
  faEdit,
  faShareSquare,
  faSave,
  faUserMd,
  faHeartbeat,
  faSearch,
  faFileMedical,
  faCapsules,
  faVial,
  faExclamationCircle,
  faTimes,
  faFlask,
  faBox,
  faPlusCircle,
  faCalendarPlus,
  faHeart,
  faWeight,
  faTachometerAlt,
  faRulerVertical,
  faMobileAlt,
  faTrash,
  faRulerHorizontal,
} from "@fortawesome/free-solid-svg-icons";
import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { Medicine } from "../../model/medicine";
import { DoctorsService } from "../../doctors.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import {
  MedicineSubcategory,
  MedicineCategory,
} from "../../enums/medicines.enum";

import { getArrayFromEnum } from "src/app/utils/getArrayFromEnum";
import { capitalizeAndRemoveUnderscores } from "src/app/utils/capitalizeAndRemoveUnderscore";
import { format } from "date-fns";
import { Colors } from "src/app/messages/toast/enums/colors";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Appointment } from "../../model/appointment";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "../../model/client";
import { PrescriptionDto } from "../../model/prescription";

@Component({
  selector: "app-doctors-create-prescription",
  templateUrl: "./doctors-create-prescription.component.html",
  styleUrls: ["./doctors-create-prescription.component.scss"],
})
export class DoctorsCreatePrescriptionComponent implements OnInit {
  faRulerVertical = faRulerVertical;
  faTachometerAlt = faTachometerAlt;
  faWeight = faWeight;
  faHeart = faHeart;

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
  faMobileAlt = faMobileAlt;
  faTrash = faTrash;
  faRulerHorizontal = faRulerHorizontal;

  isEditing: boolean = false;
  showSearch: boolean = false;
  addR: boolean = false;
  addM: boolean = false;
  addE: boolean = false;
  addNF: boolean = false;
  searchMed: boolean = false;
  annaminese: boolean = true;

  searchMedicines: Array<any> = [];
  recommendations: Array<string> = [];
  medicines: Array<Medicine> = [];
  exams: Array<ExamsEnum> = [];

  category: Array<any> = getArrayFromEnum(MedicineCategory);
  subcategory: Array<any> = getArrayFromEnum(MedicineSubcategory);
  availableExams: Array<any> = getArrayFromEnum(ExamsEnum);

  //selectedExams =

  date: Date;
  prettyDate: string;

  clients: Client[] = [];

  doctorId: string = undefined;
  appointmentId: string = undefined;

  mainColor: Colors = Colors.DOCTOR;

  prescriptionForm: FormGroup;

  latestAppointment: Appointment = undefined;

  filteredExams = this.availableExams;

  prescription: PrescriptionDto;

  constructor(
    private ds: DoctorsService,
    private ns: NotificationService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recommendations.length;
    this.date = new Date();
    this.prettyDate = format(new Date(), "dd/MM/yyyy");

    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.appointmentId = params["id"];
        this.doctorId = this.activatedRoute.parent.snapshot.params["id"];
        this.getLatestAppointment(this.doctorId, this.appointmentId);
      },
    });

    this.prescriptionForm = this.fb.group({
      id: this.fb.control("", [Validators.required]),
      height: this.fb.control(0, [Validators.required]),
      waist: this.fb.control(0, [Validators.required]),
      bpm: this.fb.control(0, [Validators.required]),
      weight: this.fb.control(0, [Validators.required]),
      pressure: this.fb.control("", [Validators.required]),
      doctor: this.fb.control(this.latestAppointment?.doctor, [
        Validators.required,
      ]),
      client: this.fb.control(this.latestAppointment?.client, [
        Validators.required,
      ]),
      exams: this.fb.control([], [Validators.required]),
      medicines: this.fb.control([], [Validators.required]),
      category: this.fb.control(""),
      subcategory: this.fb.control(""),
      formula: this.fb.control(""),
    });
  }

  filterExam(examName: string): Array<any> {
    return this.availableExams.filter((exam) =>
      exam.value.toLowerCase().match(examName.toLowerCase())
    );
  }

  applyFilter(name: string) {
    if (name !== "") this.filteredExams = this.filterExam(name);
    if (name === "") this.filteredExams = this.availableExams;
  }

  update() {
    if (this.prescriptionForm.value.id !== "")
      this.ds
        .updatePrescription(this.doctorId, this.prescriptionForm.value.id, {
          ...this.prescriptionForm.value,
          recommendations: this.recommendations,
          waist: this.prescriptionForm.value.waist,
        })
        .subscribe({
          next: () => {
            this.ns.notify({
              message: "Prescrição atualizada!",
              type: Types.SUCCESS,
            });
            this.annaminese = true;
            this.getPrescription();
          },

          error: () =>
            this.ns.notify({
              message: "Prescrição não pode ser atualizada!",
              type: Types.ERROR,
            }),
        });
  }

  create() {
    this.isEditing = !this.isEditing;

    if (this.prescriptionForm.value.id === "") {
      if (this.prescriptionForm.value.client?.id !== undefined) {
        this.latestAppointment = {
          client: this.prescriptionForm.value.client,
        };
      }

      this.ds
        .createPrescription(this.doctorId, {
          client: {
            id: this.latestAppointment?.client.id,
          },
        })
        .subscribe({
          next: (prescription: { id: string }) => {
            this.prescriptionForm.patchValue({
              id: prescription.id,
            });
            this.ns.notify({
              message: "Prescrição inicializada",
              type: Types.SUCCESS,
            });
            this.getPrescription();
          },
          error: (error) => {
            console.log(error);
            this.ns.notify({
              message: "Não foi possível criar esta prescrição.",
              type: Types.ERROR,
            });
          },
        });
    }
  }

  save(client: Client) {
    this.showSearch = false;
    this.prescriptionForm.patchValue({
      client: client,
    });

    this.ns.notify({
      message: "Click em editar para criar uma nova prescrição.",
      type: Types.INFO,
    });
  }

  toogle() {
    this.showSearch = !this.showSearch;
  }

  toogleAna() {
    this.annaminese = !this.annaminese;
  }

  search(username: string) {
    this.ds.getClients(this.doctorId, username).subscribe({
      next: (clients: Client[]) => (this.clients = clients),
    });
  }

  showAddR() {
    this.addR = !this.addR;
  }

  showAddM() {
    this.addM = !this.addM;
  }

  showAddE() {
    this.addE = !this.addE;
  }

  showSearchMed() {
    this.searchMed = !this.searchMed;
  }

  searchMedicine(name: string) {
    this.ds.searchMedicine(name).subscribe({
      next: (medicines) => (this.searchMedicines = medicines.hits.hits),
      error: () =>
        this.ns.notify({
          message: "Falha ao buscar remédios",
          type: Types.OPOSITY1,
        }),
      complete: () => console.log(this.searchMedicines),
    });
  }

  fmrt(name: string) {
    const newSentece = name.replace(/_/g, " ").toLowerCase();
    return newSentece[0].toUpperCase() + newSentece.slice(1);
  }

  addMedicine(med: any) {
    this.addNF = false;

    this.ds
      .createMedicine({
        ...med,
        prescriptionId: this.prescriptionForm.value.id,
        category: this.prescriptionForm.value.category,
        subcategory: this.prescriptionForm.value.subcategory,
        formula: this.prescriptionForm.value.formula,
      })
      .subscribe({
        next: () => {
          this.ns.notify({
            message: "Remédio adicionado",
            type: Types.INFO,
          });
          // request updated prescription
          this.getPrescription();
          this.prescriptionForm.patchValue({
            formula: "",
          });
        },
        error: () =>
          this.ns.notify({
            message: "Falha ao adicionar remédio",
            type: Types.ERROR,
          }),
      });
    this.medicines.push(med);
  }

  saveR(r: string) {
    this.recommendations.push(r);
  }

  showAddNF() {
    this.addNF = !this.addNF;
  }

  getLatestAppointment(doctorId: string, appointmentId: string) {
    if (this.appointmentId !== undefined) {
      this.ds.getAppointment(doctorId, appointmentId).subscribe({
        next: (appointment: Appointment) => {
          this.latestAppointment = appointment;
          this.ns.notify({
            message: "Clique em editar para iniciar uma nova prescricão",
            type: Types.INFO,
          });
        },
        error: () => {
          this.ns.notify({
            message: "Agendamento inválido",
            type: Types.ERROR,
          });
        },
      });
    } else {
      this.ns.notify({
        message: "Selecione um paciente para criar uma prescrição",
        type: Types.INFO,
      });
    }
  }

  createExam(exam: ExamsEnum) {
    if (this.prescriptionForm.value.id !== undefined) {
      this.ds
        .createExam({
          prescriptionId: this.prescriptionForm.value.id,
          type: exam,
        })
        .subscribe({
          next: () => {
            this.ns.notify({
              message: "Exame adicionado com sucesso",
              type: Types.SUCCESS,
            });
            this.getPrescription();
          },
          error: () =>
            this.ns.notify({
              message: "Falha ao criar exame",
              type: Types.ERROR,
            }),
        });
    }
  }

  getPrescription() {
    this.ds
      .getPrescription(this.doctorId, this.prescriptionForm.value.id)
      .subscribe({
        next: (prescription: PrescriptionDto) => {
          this.prescription = prescription; // only update the representation
          console.log(this.prescription);
          this.prescriptionForm.patchValue({
            ...prescription,
          });
        },
      });
  }

  deleteExam(id: string) {
    this.ds.deleteExam(id).subscribe({
      next: () => {
        this.ns.notify({
          message: "Exame excluído",
          type: Types.WARN,
        });
        this.getPrescription();
      },
      error: () =>
        this.ns.notify({
          message: "Falha ao excluir exame",
          type: Types.ERROR,
        }),
    });
  }

  deleteMedicine(id: string) {
    this.ds.deleteMedicine(id).subscribe({
      next: () => {
        this.ns.notify({
          message: "Remédio excluído",
          type: Types.WARN,
        });
        this.getPrescription();
      },
      error: () =>
        this.ns.notify({
          message: "Falha ao excluir remédio",
          type: Types.ERROR,
        }),
    });
  }

  deleteRecomendation(recom: string) {
    this.recommendations = this.recommendations.filter(
      (rec) => !rec.match(recom)
    );
    this.update();
  }

  deletePrescription(id: string) {
    if (this.prescriptionForm.value.id !== "") {
      this.ds.deletePrescription(this.prescription.doctor.id, id).subscribe({
        next: () => {
          this.ns.notify({
            message: "Prescrição eliminada",
            type: Types.INFO,
          });
          this.router.navigate(["doctors", this.prescription.doctor.id]);
        },
        error: () =>
          this.ns.notify({
            message:
              "Verifique se a prescrição ainda possui exames ou remédios",
            type: Types.ERROR,
          }),
      });
    }
  }

  back() {
    this.router.navigate([
      "doctors",
      this.activatedRoute.parent.snapshot.params["id"],
      "history",
    ]);
  }
}
