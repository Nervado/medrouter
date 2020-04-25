import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-appointment-confirm-modal",
  templateUrl: "./appointment-confirm-modal.component.html",
  styleUrls: ["./appointment-confirm-modal.component.scss"],
})
export class AppointmentConfirmModalComponent implements OnInit {
  closeResult = "";

  constructor(private modalService: NgbModal) {}

  @ViewChild("content") elementRef: ElementRef;

  ngOnInit(): void {}

  open(_content?) {
    const content = _content ? _content : this.elementRef;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
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
