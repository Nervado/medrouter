import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  ViewContainerRef,
  AfterContentInit,
  AfterViewInit,
  SimpleChanges,
} from "@angular/core";
import { Observable } from "rxjs";
import { Data } from "../../interfaces/data";
import { HttpClient } from "@angular/common/http";
import * as d3 from "d3";
import { ClientsService } from "../../clients.service";
import { PressureD, PressureS } from "../../enums/barchatdata";
import { DataMonth } from "../../models/data-graph";

@Component({
  selector: "app-client-bar-chart",
  templateUrl: "./client-bar-chart.component.html",
  styleUrls: ["./client-bar-chart.component.scss"],
})
export class ClientBarChartComponent implements OnInit, OnChanges {
  @Input() title: string = "Pressão Sistólica";
  @Input() data: DataMonth[];
  d: DataMonth[] = [];

  columHeight = 100;

  min: number = 0;
  max: number = 0;

  ngOnInit() {
    this.d = this.data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"]) {
      this.d = this.data;
      this.max = this.d.reduce((a, b) => {
        return Math.max(a, b.value);
      }, 0);

      this.d = this.d.map((col) => {
        col["h"] = `${(this.columHeight * col.value) / this.max}px`;
        return col;
      });
    }
  }
}
