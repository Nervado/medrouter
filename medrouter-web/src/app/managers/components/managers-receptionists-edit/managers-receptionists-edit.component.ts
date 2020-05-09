import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  Output,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  faLock,
  faFlask,
  faUserTie,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { LabDto } from "../lab-remove-confirmation/dtos/lab.dto";
import { getArrayFromEnum } from "src/app/utils/getArrayFromEnum";
import { LabCategory } from "../add-lab-modal/enums/labs-types";
import { ExamsEnum } from "../add-lab-modal/enums/exams-types";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ReceptionistDto } from "../managers-receptionists-dismiss-modal/dtos/receptionist-dto";

@Component({
  selector: "app-managers-receptionists-edit",
  templateUrl: "./managers-receptionists-edit.component.html",
  styleUrls: ["./managers-receptionists-edit.component.scss"],
})
export class ManagersReceptionistsEditComponent implements OnInit {
  closeResult = "";
  actionsForm: FormGroup;
  faLock = faLock;
  faFlask = faFlask;
  faUserTie = faUserTie;
  faCoins = faCoins;

  @Input() receptionist: ReceptionistDto;

  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.actionsForm = this.fb.group({
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      id: this.fb.control(this.receptionist.id, [Validators.required]),
      salary: this.fb.control(this.receptionist.salary, [Validators.required]),
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
}
