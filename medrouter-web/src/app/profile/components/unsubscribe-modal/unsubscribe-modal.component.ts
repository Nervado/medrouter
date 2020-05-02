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
import { Profile } from "../../models/user-profile";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SignOutDto } from "../../models/sign-out.dto";

@Component({
  selector: "app-unsubscribe-modal",
  templateUrl: "./unsubscribe-modal.component.html",
  styleUrls: ["./unsubscribe-modal.component.scss"],
})
export class UnsubscribeModalComponent implements OnInit {
  @Input() profile: Profile;
  closeResult = "";

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  signOutForm: FormGroup;

  faLock = faLock;

  @ViewChild("content") elementRef: ElementRef;

  @Output() signOut: EventEmitter<SignOutDto> = new EventEmitter();

  ngOnInit(): void {
    this.signOutForm = this.fb.group({
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
            this.signOutForm.value.password !== undefined
          ) {
            this.signOut.emit(this.signOutForm.value);
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

  /**
   * 
   *  confirm() {
    this.modalService.;
    this.signOut.emit(this.signOutForm.value);
  }
   */
}
