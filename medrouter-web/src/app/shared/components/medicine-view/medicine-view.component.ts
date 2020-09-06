import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Medicine } from "../../dtos/medicine";
import { pretty } from "src/app/utils/pretty";
import { fmrt } from "src/app/utils/fmrt";
import { faTrash, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "src/app/messages/toast/enums/colors";

@Component({
  selector: "app-medicine-view",
  templateUrl: "./medicine-view.component.html",
  styleUrls: ["./medicine-view.component.scss"],
})
export class MedicineViewComponent implements OnInit {
  @Input() medicine: Medicine;

  @Input() del: boolean = false;

  faTrash = faTrash;
  faCalendarDay = faCalendarDay;

  pretty = pretty;

  fmrt = fmrt;

  @Output() delete: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  remove(id: string) {
    if (this.del === true) {
      this.delete.emit(id);
    }
  }

  getStripeColor(stripe: string): Colors {
    const yellow = stripe.indexOf("Amarela") >= 0 ? "amarela" : undefined;
    const red = stripe.indexOf("Vermelha") >= 0 ? "vermelha" : undefined;
    const black = stripe.indexOf("Preta") >= 0 ? "preta" : undefined;
    const blue = stripe.indexOf("Azul") >= 0 ? "azul" : undefined;

    const check = yellow || red || black || blue;

    switch (check) {
      case "amarela":
        return Colors.WARN;
      case "preta":
        return Colors.BASE;
      case "vermelha":
        return Colors.ERROR;
      case "azul":
        return Colors.MEDIUM;
      default:
        return Colors.OPOSITY;
    }
  }
}
