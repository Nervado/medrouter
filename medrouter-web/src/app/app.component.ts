import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "medrouter-web";
  user: string;
  constructor() {
    this.user = "João";
  }
}
