import { Component, OnInit } from "@angular/core";
import { Colors } from "src/app/messages/toast/enums/colors";
import {
  Total,
  Misc,
  Canceled,
  Reschedule,
  Returned,
  Finished,
} from "../../models/graph-data";
import {
  faUserTie,
  faUsersCog,
  faUserMd,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";

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

  title: string = "Atendimentos";
  title2: string = "Cancelamentos";
  title3: string = "Retornos";
  title4: string = "Reagendamentos";

  title5: string = "Atendimentos";
  title6: string = "Cancelamentos";
  title7: string = "Retornos";
  title8: string = "Reagendamentos";

  finished = Finished;
  canceled = Canceled;
  reschedule = Reschedule;
  returned = Returned;

  total = Total;

  misc = Misc;

  faUserTie = faUserTie;
  faUserMd = faUserMd;
  faUsersCog = faUsersCog;
  faCoins = faCoins;

  constructor() {}

  ngOnInit(): void {}
}
