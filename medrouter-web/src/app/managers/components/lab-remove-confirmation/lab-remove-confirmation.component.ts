import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { faLock, faFlask } from "@fortawesome/free-solid-svg-icons";
import { LabDto } from "./dtos/lab.dto";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-lab-remove-confirmation",
  templateUrl: "./lab-remove-confirmation.component.html",
  styleUrls: ["./lab-remove-confirmation.component.scss"],
})
export class LabRemoveConfirmationComponent implements OnInit {
  closeResult = "";
  actionsForm: FormGroup;
  faLock = faLock;
  faFlask = faFlask;

  @Input() lab: LabDto;

  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.actionsForm = this.fb.group({
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: this.fb.control(this.lab?.name, [Validators.required]),
      id: this.fb.control(this.lab?.id, [Validators.required]),
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
              name: this.lab.name,
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
}
