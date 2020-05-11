import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  faLock,
  faUser,
  faFlask,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Category } from "./dtos/option.dto";
import { LabCategory } from "./enums/labs-types";
import { getArrayFromEnum } from "src/app/utils/getArrayFromEnum";
import { capitalizeAndRemoveUnderscores } from "src/app/utils/capitalizeAndRemoveUnderscore";
import { ExamsEnum } from "./enums/exams-types";

@Component({
  selector: "app-add-lab-modal",
  templateUrl: "./add-lab-modal.component.html",
  styleUrls: ["./add-lab-modal.component.scss"],
})
export class AddLabModalComponent implements OnInit {
  closeResult = "";
  actionsForm: FormGroup;
  faLock = faLock;
  faUser = faUser;
  faFlask = faFlask;
  faUserTie = faUserTie;

  options: Array<any> = getArrayFromEnum(LabCategory);
  exams: Array<any> = getArrayFromEnum(ExamsEnum);

  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.actionsForm = this.fb.group({
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: this.fb.control("", [Validators.required]),
      cnpj: this.fb.control("", [Validators.required]),
      category: this.fb.control([], [Validators.required]),
      exams: this.fb.control([], [Validators.required]),
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
}
