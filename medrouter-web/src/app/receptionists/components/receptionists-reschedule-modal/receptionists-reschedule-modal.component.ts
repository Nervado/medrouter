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
  faClock,
  faUserMd,
  faCalendarDay,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Colors } from "src/app/messages/toast/enums/colors";
import { Appointment } from "../../model/appointment";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AppointmentStatus } from "src/app/doctors/enums/appontment-status";
import { capitalizeAndRemoveUnderscores } from "src/app/utils/capitalizeAndRemoveUnderscore";
import { format } from "date-fns";
import { Hour } from "../../enums/hours.enum";

@Component({
  selector: "app-receptionists-reschedule-modal",
  templateUrl: "./receptionists-reschedule-modal.component.html",
  styleUrls: ["./receptionists-reschedule-modal.component.scss"],
})
export class ReceptionistsRescheduleModalComponent implements OnInit {
  closeResult = "";

  faLock = faLock;
  faUser = faUser;
  faFlask = faFlask;
  faUserTie = faUserTie;
  faClock = faClock;
  faUserMd = faUserMd;
  faCalendarDay = faCalendarDay;
  faSearch = faSearch;

  date: Date = new Date();

  tick: boolean = false;

  btColor: Colors = Colors.RECEPT;

  mainColor: Colors = Colors.RECEPT;
  exam: any;

  hours: Array<string> = Hour.map((hour) => `${hour}`);
  actionsForm: FormGroup;

  @Input() appointment: Appointment;
  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  search() {
    console.log("procurando");
  }

  ngOnInit(): void {
    this.actionsForm = this.fb.group({
      hour: this.fb.control("", [Validators.required]),
      date: this.fb.control(new Date(), [Validators.required]),
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
            this.actionsForm.value.password !== undefined
          ) {
            this.signOut.emit(this.actionsForm.value);
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
