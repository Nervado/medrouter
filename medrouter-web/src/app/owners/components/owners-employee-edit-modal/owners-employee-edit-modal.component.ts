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
import {
  faLock,
  faFlask,
  faUserTie,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeDto } from "../../dtos/employee-dto";
import { AuthService } from "src/app/auth/auth.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-owners-employee-edit-modal",
  templateUrl: "./owners-employee-edit-modal.component.html",
})
export class OwnersEmployeeEditModalComponent implements OnInit {
  closeResult = "";
  actionsForm: FormGroup;
  faLock = faLock;
  faFlask = faFlask;
  faUserTie = faUserTie;
  faCoins = faCoins;

  @Input() employee: EmployeeDto;

  @ViewChild("content") elementRef: ElementRef;
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private as: AuthService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.actionsForm = this.fb.group({
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      id: this.fb.control(this.employee?.id, [Validators.required]),
      salary: this.fb.control(this.employee?.salary, [Validators.required]),
      diff: this.fb.control(this.employee?.salary, [Validators.required]),
    });
  }

  open(_content?) {
    const content = _content ? _content : this.elementRef;

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;

          this.actionsForm.patchValue({
            diff: this.actionsForm.value.salary - this.employee.salary,
            id: this.employee.id,
          });

          if (result === "confirm") {
            if (this.as.loginDto === undefined) {
              this.ns.notify({
                message: "Realize um novo login para validar esta operação",
                type: Types.WARN,
                timer: 2000,
              });
            }
            if (!this.actionsForm.valid) {
              this.ns.notify({
                message: "O formulário contém campos vazios",
                type: Types.WARN,
                timer: 2000,
              });
            }

            if (
              this.actionsForm.value.password === this.as.loginDto.password &&
              this.actionsForm.valid
            ) {
              this.signOut.emit(this.actionsForm.value);

              this.modalService.dismissAll();
            }
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
