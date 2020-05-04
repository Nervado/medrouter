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

@Component({
  selector: "app-managers-actions-modal",
  templateUrl: "./managers-actions-modal.component.html",
  styleUrls: ["./managers-actions-modal.component.scss"],
})
export class ManagersActionsModalComponent implements OnInit {
  @Input() profile: Profile;
  closeResult = "";
  constructor(private modalService: NgbModal, private fb: FormBuilder) {}
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
      salary: this.fb.control("", [Validators.required]),
      include: this.fb.control("", [Validators.required]),
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
