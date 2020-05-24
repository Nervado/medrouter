import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Profile } from "src/app/profile/models/user-profile";
import { Colors } from "src/app/messages/toast/enums/colors";
import { AuthService } from "src/app/auth/auth.service";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-managers-actions-modal",
  templateUrl: "./managers-actions-modal.component.html",
  styleUrls: ["./managers-actions-modal.component.scss"],
})
export class ManagersActionsModalComponent implements OnInit {
  @Input() profile: Profile;
  @Input() mainColor: Colors = Colors.BASE;
  closeResult = "";
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private as: AuthService,
    private ns: NotificationService
  ) {}
  actionsForm: FormGroup;
  faLock = faLock;
  faUser = faUser;

  @ViewChild("content") elementRef: ElementRef;

  @Output() signOut: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.actionsForm = this.fb.group({
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      type: this.fb.control("", [Validators.required]),
      salary: this.fb.control("2455787", [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      include: this.fb.control("", [Validators.required]),
    });
  }
  teste(e) {
    console.log(e);
  }
  open(_content?) {
    const content = _content ? _content : this.elementRef;

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (this.as.loginDto === undefined) {
            this.ns.notify({
              message: "Realize um novo login para validar esta operação",
              type: Types.WARN,
              timer: 2000,
            });
          }
          if (!this.actionsForm.valid) {
            this.ns.notify({
              message: "O formulário contém erros",
              type: Types.WARN,
              timer: 2000,
            });
          }
          console.log(this.actionsForm.value, result);
          if (
            result === "confirm" &&
            this.actionsForm.value.password === this.as.loginDto.password &&
            this.actionsForm.valid
          ) {
            this.signOut.emit(this.actionsForm.value);
            this.modalService.dismissAll();
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
}
