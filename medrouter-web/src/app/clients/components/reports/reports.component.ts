import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Data } from "../../interfaces/data";
import { ClientsService } from "../../clients.service";
import { Router } from "@angular/router";
import { PressureD, PressureS } from "../../enums/barchatdata";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  d: Array<any> = PressureD;
  s: Array<any> = PressureS;

  constructor(private clientesService: ClientsService) {}

  ngOnInit() {}
}
