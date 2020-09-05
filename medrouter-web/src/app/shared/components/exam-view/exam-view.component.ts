import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ExamDto } from "../../dtos/exam";
import { pretty } from "src/app/utils/pretty";
import { fmrt } from "src/app/utils/fmrt";
import {
  faCalendarDay,
  faCoins,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import getStatusColor from "src/app/utils/getStatusColor";
import { faClock } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-exam-view",
  templateUrl: "./exam-view.component.html",
  styleUrls: ["./exam-view.component.scss"],
})
export class ExamViewComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faCoins = faCoins;
  faClock = faClock;
  faTrash = faTrash;

  @Input() exam: ExamDto;

  @Input() del: boolean = false;

  pretty = pretty;

  getStatusColor = getStatusColor;

  fmrt = fmrt;

  @Output() delete: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  remove(id: string) {
    if (this.del === true) {
      this.delete.emit(id);
    }
  }
}
