import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  faLock,
  faUser,
  faFlask,
  faUserTie,
  faUserMd,
  faCalendarDay,
  faSearch,
  faChevronLeft,
  faChevronRight,
  faMobileAlt,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { Colors } from "src/app/messages/toast/enums/colors";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { capitalizeAndRemoveUnderscores } from "src/app/utils/capitalizeAndRemoveUnderscore";
import { Appointment } from "../../model/appointment";
import { AppointmentStatus } from "../../enums/appontment-status";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { format } from "date-fns";
import { ReceptionistsService } from "../../receptionists.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Client } from "../../model/client";
import { ClientDto } from "../../dtos/client-dto";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-receptionists-create-appointment-modal",
  templateUrl: "./receptionists-create-appointment-modal.component.html",
  styleUrls: ["./receptionists-create-appointment-modal.component.scss"],
})
export class ReceptionistsCreateAppointmentModalComponent implements OnInit {
  faLock = faLock;
  faUser = faUser;
  faUserTie = faUserTie;
  faClock = faClock;
  faUserMd = faUserMd;
  faCalendarDay = faCalendarDay;
  faSearch = faSearch;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faMobileAlt = faMobileAlt;
  faCoins = faCoins;

  closeResult = "";
  actionsForm: FormGroup;
  mainColor: Colors = Colors.RECEPT;
  exam: any;
  page: number = 1;
  username: string;

  @Input() appointment: Appointment;
  clients: ClientDto[] = [];

  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private rs: ReceptionistsService,
    private ns: NotificationService
  ) {}

  search(username: string) {
    this.username = username;
    this.page = 1;
    this.findClients(username, this.page);
  }

  pageUp() {
    this.page += 1;
    this.findClients(this.username, this.page);
  }
  pageDonw() {
    this.page = this.page > 1 ? this.page - 1 : 1;
    this.findClients(this.username, this.page);
  }

  findClients(username, page) {
    this.rs
      .getClients({
        username,
        page,
      })
      .subscribe({
        next: (clients: ClientDto[]) => (this.clients = clients),
        error: () =>
          this.ns.notify({
            message: "Falha ao buscar clientes!",
            type: Types.ERROR,
          }),
      });
  }

  ngOnInit(): void {
    this.actionsForm = this.fb.group({
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  open(_content?) {
    const content = _content ? _content : this.elementRef;

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (
            result === "confirm" &&
            this.actionsForm.value.password !== undefined &&
            this.appointment.client.id !== undefined
          ) {
            this.signOut.emit({
              password: this.actionsForm.value.password,
              appointment: this.appointment,
            });
          }
          this.actionsForm.reset();
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.actionsForm.reset();
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  prettify(sentence: string): string {
    return capitalizeAndRemoveUnderscores(sentence);
  }

  prettyDate(date) {
    return format(date, "dd/MM/yyyy");
  }
}
