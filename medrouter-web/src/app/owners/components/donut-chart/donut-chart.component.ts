import { Component, OnInit, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-donut-chart",
  templateUrl: "./donut-chart.component.html",
  styleUrls: ["./donut-chart.component.scss"],
})
export class DonutChartComponent implements OnInit {
  @Input() radius;
  @Input() stroke;
  @Input() progress;
  @Input() color;
  @Input() title;
  //@Input() icon;
  dashArray: string;

  normalizedRadius: number;
  circumference: number;
  strokeDashoffset: number;

  cont: string;

  ring: string;

  ngOnInit(): void {
    this.normalizedRadius = this.radius - this.stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;

    this.strokeDashoffset =
      this.circumference - (this.progress / 100) * this.circumference;

    this.cont = `${this.radius * 2 + this.radius / 3}px`;
    this.ring = `${this.radius * 2}`;

    this.dashArray = `${this.circumference} ${this.circumference}`;
  }
}
