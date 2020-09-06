import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Data } from "../../interfaces/data";
import { ClientsService } from "../../clients.service";
import { Router, ActivatedRoute } from "@angular/router";
import { PressureD, PressureS } from "../../enums/barchatdata";
import { DataGraph, DataMonth } from "../../models/data-graph";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  d: Array<DataMonth> = [];
  s: Array<DataMonth> = [];

  constructor(
    private clientesService: ClientsService,
    private activatedRoute: ActivatedRoute,
    private ns: NotificationService
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe({
      next: (params) =>
        this.clientesService.getDataGraph(params["id"]).subscribe({
          next: (data: DataGraph) => {
            this.d = data.PressureD;
            this.s = data.PressureS;
          },
          error: () =>
            this.ns.notify({
              message: "Falha ao obter dados",
              type: Types.WARN,
            }),
        }),
    });
  }
}
