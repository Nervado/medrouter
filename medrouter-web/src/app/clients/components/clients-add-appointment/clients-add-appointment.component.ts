import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  ViewChild,
  Output,
  Input,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Appointment } from "../../models/appointment";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AppointmentStatus } from "../../enums/appontment-status";
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
import { Hour } from "src/app/doctors/enums/hours.enum";
import { capitalizeAndRemoveUnderscores } from "src/app/utils/capitalizeAndRemoveUnderscore";
import { format } from "date-fns";

@Component({
  selector: "app-clients-add-appointment",
  templateUrl: "./clients-add-appointment.component.html",
  styleUrls: ["./clients-add-appointment.component.scss"],
})
export class ClientsAddAppointmentComponent implements OnInit {
  closeResult = "";
  actionsForm: FormGroup;
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

  btColor: Colors = Colors.CLIENT;

  mainColor: Colors = Colors.CLIENT;
  exam: any;

  hours: Array<string> = Hour.map((hour) => `${hour}h`);

  @Input() appointment: Appointment;
  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.actionsForm = this.fb.group({
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      doctor: this.fb.control({}, [Validators.required]),
      client: this.fb.control({}, [Validators.required]),
      hour: this.fb.control("", [Validators.required]),
      date: this.fb.control("", [Validators.required]),
    });
  }

  selectUser(user: string) {}
  open(_content?) {
    const content = _content ? _content : this.elementRef;

    this.date = this.appointment.doctor.schedule.date;

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (
            result === "confirm" &&
            this.actionsForm.value.password !== undefined
          ) {
            this.actionsForm.patchValue({
              ...this.appointment,
            });
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
