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

  mainColor: Colors = Colors.DOCTOR;

  prescriptionForm: FormGroup;

  constructor(
    private ds: DoctorsService,
    private ns: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.recomendations.length;
    console.log(this.category, this.subcategory);
    this.date = new Date();
    this.prettyDate = format(new Date(), "dd/MM/yyyy");
    this.searchMedicine("peni");
    this.prescriptionForm = this.fb.group({
      exams: this.fb.control([], [Validators.required]),
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
}
