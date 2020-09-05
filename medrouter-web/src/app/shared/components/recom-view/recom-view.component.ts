import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-recom-view",
  templateUrl: "./recom-view.component.html",
  styleUrls: ["./recom-view.component.scss"],
})
export class RecomViewComponent implements OnInit {
  faTrash = faTrash;

  @Input() recomendation: string;
  @Input() del: boolean = true;
  @Input() indice: number = 1;
  @Output() delete: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.recomendation !== undefined) {
      this.recomendation = this.recomendation
        ?.replace('"', "")
        ?.split(":")[1]
        ?.replace('"', "");
    }
  }

  remove(value: string) {
    if (this.del === true) {
      this.delete.emit(value);
    }
  }
}
