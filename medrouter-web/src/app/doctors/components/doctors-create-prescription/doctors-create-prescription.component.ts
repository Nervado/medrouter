import { Component, OnInit } from "@angular/core";
import {
  faChevronLeft,
  faChevronRight,
  faSquare,
  faCheckSquare,
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
import { ActivatedRoute } from "@angular/router";

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

  isEditing: boolean = false;
  showSearch: boolean = false;
  addR: boolean = false;
  addM: boolean = false;
  addE: boolean = false;
  addNF: boolean = false;
  searchMed: boolean = false;
  annaminese: boolean = false;

  searchMedicines: Array<any> = [];
  recomendations: Array<string> = [];
  medicines: Array<Medicine> = [];
  exams: Array<ExamsEnum> = [];

  category: Array<any> = getArrayFromEnum(MedicineCategory);
  subcategory: Array<any> = getArrayFromEnum(MedicineSubcategory);
  availableExams: Array<any> = getArrayFromEnum(ExamsEnum);
  date: Date;
  prettyDate: string;

  doctorId: string = undefined;
  appointmentId: string = undefined;

  mainColor: Colors = Colors.DOCTOR;

  prescriptionForm: FormGroup;

  latestAppointment: Appointment = undefined;

  constructor(
    private ds: DoctorsService,
    private ns: NotificationService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recomendations.length;
    this.date = new Date();
    this.prettyDate = format(new Date(), "dd/MM/yyyy");
    this.prescriptionForm = this.fb.group({
      exams: this.fb.control([], [Validators.required]),
    });

    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.appointmentId = params["id"];
        this.doctorId = this.activatedRoute.parent.snapshot.params["id"];
        this.getLatestAppointment(this.doctorId, this.appointmentId);
      },
    });
  }

  save() {}

  toogle() {
    this.showSearch = !this.showSearch;
  }

  toogleAna() {
    this.annaminese = !this.annaminese;
  }

  search() {}

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
    this.medicines.push(med);
    console.log(med);
  }

  saveR(r: string) {
    this.recomendations.push(r);
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
            message: "Paciente não tem consulta agendada",
            type: Types.ERROR,
          });
        },
      });
    } else {
      this.ns.notify({
        message: "Selecione um paciente para criar uma prescricão",
        type: Types.INFO,
      });
    }
  }
}
