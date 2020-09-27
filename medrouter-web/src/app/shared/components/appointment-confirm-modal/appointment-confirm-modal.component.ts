import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  faBriefcaseMedical,
  faCalendarDay,
  faClock,
  faEnvelope,
  faPhoneAlt,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { format } from "date-fns";

import { NonClientAppointmentRequest } from "src/app/home/components/appointment-form/dtos/appointment-nonclient-request.dto";
import { fmrt } from "src/app/utils/fmrt";

@Component({
  selector: "app-appointment-confirm-modal",
  templateUrl: "./appointment-confirm-modal.component.html",
  styleUrls: ["./appointment-confirm-modal.component.scss"],
})
export class AppointmentConfirmModalComponent implements OnInit {
  faUserTie = faUserTie;
  faPhone = faPhoneAlt;
  faEmail = faEnvelope;
  faClock = faClock;
  faCalendarday = faCalendarDay;
  faBriefCase = faBriefcaseMedical;

  closeResult = "";

  constructor(private modalService: NgbModal) {}

  @ViewChild("content") elementRef: ElementRef;

  @Input() appointmentResume: NonClientAppointmentRequest;

  @Output() send: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {}

  open(_content?, data?: NonClientAppointmentRequest) {
    const content = _content ? _content : this.elementRef;

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;

          if (result === "confirm") {
            this.send.emit(true);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  prettyDate(date) {
    return format(date, "dd/MM/yyyy");
  }

  fmrt = fmrt;
}
