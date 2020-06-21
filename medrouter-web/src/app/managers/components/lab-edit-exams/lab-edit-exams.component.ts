import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  Output,
} from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { faLock, faFlask, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { LabDto } from "../lab-remove-confirmation/dtos/lab.dto";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { getArrayFromEnum } from "src/app/utils/getArrayFromEnum";
import { LabCategory } from "../add-lab-modal/enums/labs-types";
import { ExamsEnum } from "../add-lab-modal/enums/exams-types";

@Component({
  selector: "app-lab-edit-exams",
  templateUrl: "./lab-edit-exams.component.html",
  styleUrls: ["./lab-edit-exams.component.scss"],
})
export class LabEditExamsComponent implements OnInit {
  closeResult = "";
  actionsForm: FormGroup;
  faLock = faLock;
  faFlask = faFlask;
  faUserTie = faUserTie;

  @Input() lab: LabDto;

  options: Array<any> = getArrayFromEnum(LabCategory);

  exams: Array<any> = getArrayFromEnum(ExamsEnum);
  labcategory: Array<any> = getArrayFromEnum(LabCategory);

  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.actionsForm = this.fb.group({
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(6),
      ]),

      id: this.fb.control(this.lab?.id, [Validators.required]),
      exams: this.fb.control(this.lab?.exams, [Validators.required]),
      labcategory: this.fb.control(this.lab?.labcategory, [
        Validators.required,
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
            this.actionsForm.patchValue({
              id: this.lab.id,
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

  pretty(name: string) {
    const s = name.replace(/"/g, "").replace(/_/g, " ");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
