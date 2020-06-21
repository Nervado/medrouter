import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  ElementRef,
  Input,
  Output,
} from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { LabDto } from "../lab-remove-confirmation/dtos/lab.dto";
import {
  faFlask,
  faLock,
  faUserTie,
  faUser,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-lab-users-edit",
  templateUrl: "./lab-users-edit.component.html",
  styleUrls: ["./lab-users-edit.component.scss"],
})
export class LabUsersEditComponent implements OnInit {
  closeResult = "";
  actionsForm: FormGroup;
  faLock = faLock;
  faFlask = faFlask;
  faUserTie = faUserTie;
  faUser = faUser;
  faTimes = faTimes;

  removes = [];

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
      name: this.fb.control(""),
      id: this.fb.control(this.lab?.id, [Validators.required]),
      cpf: this.fb.control("", [
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
      ]),
      type: this.fb.control("", [Validators.required]),
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
            this.signOut.emit({
              ...this.actionsForm.value,
              data: this.removes,
            });
          }
          this.resetRemovals();
        },

        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.resetRemovals();
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

  remove(user: any) {
    this.removes.push(user);
    this.lab.users = this.lab.users.filter((u) => u.userId !== user.userId);
  }

  add(user: any) {
    this.lab.users.push(user);
    this.removes = this.removes.filter((u) => u.userId !== user.userId);
  }

  resetRemovals() {
    this.lab.users = [...this.lab.users, ...this.removes];
    this.removes = [];
    this.actionsForm.reset();
  }
}
