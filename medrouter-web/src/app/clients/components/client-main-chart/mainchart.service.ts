import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MEDROUTER_API } from "../../app.api";
import { Observable } from "rxjs";
import "rxjs/operator/map";
import { ErrorHandler } from "../../app-error.handler";
import { Data } from "./models/chart.model";

@Injectable({
  providedIn: "root",
})
export class MainchartService {
  data: Observable<Data>;
  constructor(private httpClient: HttpClient) {}

  // get(): Observable<Data> {}
}
