import { Component, OnInit, Input } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";

@Component({
  selector: "app-client-bar-chart",
  templateUrl: "./client-bar-chart.component.html",
  styleUrls: ["./client-bar-chart.component.scss"],
})
export class ClientBarChartComponent implements OnInit {
  @Input() title: string;
  @Input() data: Array<any>;
  @Input() color: Colors;

  columHeight = 100;
  min: number = 0;
  max: number;

  ngOnInit() {
    this.max = this.data.reduce((a, b) => {
      return Math.max(a, b.value);
    }, 0);

    this.data = this.data.map((col) => {
      col["h"] = `${(this.columHeight * col.value) / this.max}px`;
      return col;
    });
  }
}
