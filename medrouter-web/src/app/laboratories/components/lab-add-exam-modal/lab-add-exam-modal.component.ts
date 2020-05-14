import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  faLock,
  faFlask,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getArrayFromEnum } from "src/app/utils/getArrayFromEnum";
import { LabCategory } from "src/app/managers/components/add-lab-modal/enums/labs-types";
import { ExamsEnum } from "src/app/managers/components/add-lab-modal/enums/exams-types";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { capitalizeAndRemoveUnderscores } from "src/app/utils/capitalizeAndRemoveUnderscore";
import { Colors } from "src/app/messages/toast/enums/colors";
import { ExamStatus } from "src/app/doctors/enums/status.enum";

@Component({
  selector: "app-lab-add-exam-modal",
  templateUrl: "./lab-add-exam-modal.component.html",
  styleUrls: ["./lab-add-exam-modal.component.scss"],
})
export class LabAddExamModalComponent implements OnInit {
  closeResult = "";
  actionsForm: FormGroup;
  faLock = faLock;
  faUser = faUser;
  faFlask = faFlask;
  faUserTie = faUserTie;

  mainColor: Colors = Colors.LAB;
  exam: any;

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

    this.exam = {
      id: 12,
      price: 200,
      type: ExamsEnum.ABDMO,
      doctor: {
        id: 123,
        user: { fullname: "Paulo Bessa" },
      },
      status: ExamStatus.CONCLUDED,
      docs: [
        {
          id: 435,
          url: "https://api.adorable.io/avatars/50/abott@adorable.png",
        },
      ],
      lab: {
        id: 122,
        name: "LabA+",
      },
      client: {
        id: 264,
        user: {
          fullname: "Pedro da Silva",
          avatar: {
            url: "https://api.adorable.io/avatars/50/abott@adorable.png",
          },
        },
      },
      createdAt: new Date(),
    };
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
