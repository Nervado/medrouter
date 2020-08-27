import { Component, OnInit } from "@angular/core";
import {
  faRulerVertical,
  faTachometerAlt,
  faWeight,
  faHeart,
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
  faMobileAlt,
  faTrash,
  faRulerHorizontal,
} from "@fortawesome/free-solid-svg-icons";
import { Medicine } from "../../model/medicine";
import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { getArrayFromEnum } from "src/app/utils/getArrayFromEnum";
import {
  MedicineCategory,
  MedicineSubcategory,
} from "../../enums/medicines.enum";
import { Client } from "src/app/clients/models/client";
import { Colors } from "src/app/messages/toast/enums/colors";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Appointment } from "src/app/clients/models/appointment";
import { PrescriptionDto } from "../../model/prescription";
import { DoctorsService } from "../../doctors.service";
import { NotificationService } from "src/app/messages/notification.service";
import { ActivatedRoute, Router } from "@angular/router";
import { format } from "date-fns";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-edit-prescription",
  templateUrl: "./edit-prescription.component.html",
  styleUrls: ["./edit-prescription.component.scss"],
})
export class EditPrescriptionComponent implements OnInit {
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
  annaminese: boolean = false;

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

    this.prescriptionForm = this.fb.group({
      id: this.fb.control("", [Validators.required]),
      waist: this.fb.control(0, [Validators.required]),
      height: this.fb.control(0, [Validators.required]),
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
    });

    this.activatedRoute.params.subscribe((params) => {
      this.doctorId = this.activatedRoute.parent.snapshot.params["id"];
      this.prescriptionForm.patchValue({
        id: params["id"],
      });
      this.getPrescription();
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
        })
        .subscribe({
          next: () =>
            this.ns.notify({
              message: "Prescrição atualizada!",
              type: Types.SUCCESS,
            }),
          error: () =>
            this.ns.notify({
              message: "Prescrição não pode ser atualizada!",
              type: Types.ERROR,
            }),
        });
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
    this.ds
      .createMedicine({
        ...med,
        prescriptionId: this.prescriptionForm.value.id,
        category: this.prescriptionForm.value.category,
        subcategory: this.prescriptionForm.value.subcategory,
      })
      .subscribe({
        next: () => {
          this.ns.notify({
            message: "Remédio adicionado",
            type: Types.INFO,
          });
          // request updated prescription
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

  back() {
    this.router.navigate(["doctors", this.prescription.doctor.id, "history"]);
  }
}
