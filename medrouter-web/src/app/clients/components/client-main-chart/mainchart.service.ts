import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/operator/map";
import { Data } from "./models/chart.model";

@Injectable({
  providedIn: "root",
})
export class MainchartService {
  data: Observable<Data>;
  constructor(private httpClient: HttpClient) {}

  // get(): Observable<Data> {}
}
