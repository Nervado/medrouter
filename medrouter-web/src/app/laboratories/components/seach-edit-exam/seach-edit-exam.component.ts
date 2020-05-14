import { Component, OnInit } from "@angular/core";
import { faFileMedicalAlt } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "src/app/messages/toast/enums/colors";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-seach-edit-exam",
  templateUrl: "./seach-edit-exam.component.html",
  styleUrls: ["./seach-edit-exam.component.scss"],
})
export class SeachEditExamComponent implements OnInit {
  faFileMedicalAlt = faFileMedicalAlt;

  mainColor: Colors = Colors.LAB;

  examForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  confirm(e) {
    console.log(e);
  }

  showModal(modal) {
    modal.open();
  }
  ngOnInit(): void {
    this.examForm = this.fb.group({
      code: this.fb.control("", [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
}
