import { Component, OnInit } from "@angular/core";

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

  constructor() {}

  showForm = false;

  ngOnInit(): void {}

  show() {
    this.showForm = true;
  }

  showModalConfirmation(e, modal) {
    modal.open(modal.content);
  }
}
