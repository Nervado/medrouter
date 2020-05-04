import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { Profile } from "src/app/profile/models/user-profile";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-add-lab-modal",
  templateUrl: "./add-lab-modal.component.html",
  styleUrls: ["./add-lab-modal.component.scss"],
})
export class AddLabModalComponent implements OnInit {
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
