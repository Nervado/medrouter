import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";

import {
  faUserTie,
  faUsersCog,
  faUserMd,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { OwnersService } from "../../owners.service";
import { ActivatedRoute } from "@angular/router";
import { TotalDto } from "src/app/messages/toast/dto/total.dto";
import { NotificationService } from "src/app/messages/notification.service";
import { Types } from "src/app/messages/toast/enums/types";
import { StatsDto } from "../../dtos/stats.dto";
import { AuthService } from "src/app/auth/auth.service";
import { Role } from "src/app/auth/enums/roles-types";

@Component({
  selector: "app-owners-dasboard",
  templateUrl: "./owners-dasboard.component.html",
  styleUrls: ["./owners-dasboard.component.scss"],
})
export class OwnersDasboardComponent implements OnInit {
  color: Colors = Colors.SUCCESS;
  color2: Colors = Colors.ERROR;
  color3: Colors = Colors.PROFILE;
  color4: Colors = Colors.INFO;
  color5: Colors = Colors.WARN;

  title: string = "Atendimentos";
  title2: string = "Cancelamentos";
  title3: string = "Solicitações";
  title4: string = "Reagendamentos";

  title5: string = "Atendimentos";
  title6: string = "Cancelamentos";
  title7: string = "Solicitaçoes";
  title8: string = "Reagendamentos";

  title9: string = "Agendados";

  total: TotalDto = new TotalDto();

  stats: StatsDto = new StatsDto();

  faUserTie = faUserTie;
  faUserMd = faUserMd;
  faUsersCog = faUsersCog;
  faCoins = faCoins;

  constructor(
    private os: OwnersService,
    private ar: ActivatedRoute,
    private ns: NotificationService,
    private as: AuthService
  ) {}

  ngOnInit(): void {
    //const id = this.as.getRuleId(Role.OWNER);

    //this.getTotals(id);
    //this.getStats(id);

    this.ar.parent.params.subscribe({
      next: (params) => {
        this.getTotals(params["id"]);
        this.getStats(params["id"]);
      },
    });
  }

  getTotals(id: string) {
    this.os.getTotals(id).subscribe({
      next: (total: TotalDto) => (this.total = total),
      error: () =>
        this.ns.notify({
          message: "Falha ao obter dados",
          type: Types.WARN,
        }),
    });
  }

  getStats(id: string) {
    this.os.getStats(id).subscribe({
      next: (stats: StatsDto) => (this.stats = stats),
      error: () =>
        this.ns.notify({
          message: "Falha ao obter dados gráficos",
          type: Types.WARN,
        }),
    });
  }
}
