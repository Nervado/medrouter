import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import {
  faFileMedical,
  faLaptopMedical,
  faFileInvoiceDollar,
  faCalendarTimes,
  faCalendarPlus,
  faBusinessTime,
  faStar,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/auth/auth.service";
import { Role } from "src/app/auth/enums/roles-types";
import { NonClientAppointmentRequest } from "../../components/appointment-form/dtos/appointment-nonclient-request.dto";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  cards = [
    {
      url: "../assets/esteto.jpg",
      text: "Cardilogia, Neurologia e Geriatria, Pediatria, Psquiatria.",
      category: "Multiplas Especialidades",
    },
    {
      url: "../assets/diag.jpg",
      text: "A tecnologia digital a serviço da ciência médica.",
      category: "Telemedicina",
    },
    {
      url: "../assets/team.jpg",
      text: "Centenas de anos de experiência combinados em um único time.",
      category: "Equipe",
    },
    {
      url: "../assets/exam.jpeg",
      text: "Temos parcerias com os mais eficientes laboratórios.",
      category: "Diagnósticos",
    },
  ];

  faFileMedical = faFileMedical;
  faLaptopMedical = faLaptopMedical;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faCalendarTimes = faCalendarTimes;
  faCalendarPlus = faCalendarPlus;
  faBusinessTime = faBusinessTime;

  faStar = faStar;

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  appRequest: NonClientAppointmentRequest;

  constructor(private authService: AuthService, private router: Router) {}

  showForm = false;

  ngOnInit(): void {}

  show() {
    if (this.authService.isloggedIn()) {
      this.router.navigate([
        `clients/`,
        this.authService.getRuleId(Role.CLIENT),
      ]);
    } else {
      this.showForm = true;
    }
  }

  showModalConfirmation(e, modal) {
    modal.open(modal.content, e);
    this.appRequest = e;
  }
}
