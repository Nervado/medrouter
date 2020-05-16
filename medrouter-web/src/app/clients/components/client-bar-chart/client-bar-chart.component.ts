import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  ViewContainerRef,
} from "@angular/core";
import { Observable } from "rxjs";
import { Data } from "../../interfaces/data";
import { HttpClient } from "@angular/common/http";
import * as d3 from "d3";
import { ClientsService } from "../../clients.service";
import { PressureD, PressureS } from "../../enums/barchatdata";

@Component({
  selector: "app-client-bar-chart",
  templateUrl: "./client-bar-chart.component.html",
  styleUrls: ["./client-bar-chart.component.scss"],
})
export class ClientBarChartComponent implements OnInit {
  @Input() title: string = "Pressão Sistólica";
  @Input() data: Array<any>;
  d: Array<any> = PressureD;
  s = PressureS;

  columHeight = 100;

  min = 0;
  max;
  ngOnInit() {
    this.d = this.data;
    this.max = this.d.reduce((a, b) => {
      return Math.max(a, b.value);
    }, 0);
    this.d = this.d.map((col) => {
      col["h"] = `${(this.columHeight * col.value) / this.max}px`;
      return col;
    });

    console.log(this.d);
  }

  /**
   * 
   * 

  const [colWidht, setColWidth] = useState(0);

  const NUMCOL = 12;

  useEffect(() => {
    const MAXCOLSIZE = size / NUMCOL;
    let _colWidth = 0;

    if (MAXCOLSIZE - 2 > barLenght) {
      _colWidth = MAXCOLSIZE - 2;
    } else {
      _colWidth = barLenght;
    }

    setColWidth(_colWidth);
  }, [barLenght, size]);

  return (
    <Container color={color}>
      <h1>{title}</h1>
      <Content
        height={`${size + size / 6}px`}
        width={`${size + size / 1.5}px`}
        size={`${size}px`}
      >
        <div className="content">
          <AxisY
            height={`${size + size / 6}px`}
            width={`${colWidht}px`}
            color={color}
          >
            <div className="y">
              <div className="max">{max}</div>
              <div className="min">0</div>
            </div>
          </AxisY>
          <div className="chart">
            {data.map(mounth => (
              <Bar
                size={`${(mounth.value * size) / max}px`}
                height={`${size + size / 6}px`}
                width={`${colWidht * 1.5}px`}
                key={mounth.id}
                color={color}
                gradient={gradient}
              >
                <div className="div1">
                  <div className="bar" />
                </div>

                <div className="div2">
                  <div className="x">{mounth.mounth}</div>
                </div>
              </Bar>
            ))}
          </div>
        </div>
      </Content>
    </Container>
  );
   */
}
