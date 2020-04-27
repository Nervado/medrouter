import {
  trigger,
  transition,
  keyframes,
  animate,
  style,
  state,
} from "@angular/animations";

export const ShowUp = trigger("showup", [
  state(
    "hidden",
    style({
      top: "30px",
      opacity: 0,
      visibility: "hidden",
      height: "0px",
    })
  ),
  state(
    "visible",
    style({
      top: "30px",
      opacity: 1,
      visibility: "visible",
      height: "210px",
    })
  ),
  transition(
    "hidden => visible",
    animate(
      "200ms ease-out",
      keyframes([
        style({
          opacity: 0,
          visibility: "hidden",
          height: "0px",
        }),
        style({
          opacity: 1,
          visibility: "visible",
          height: "210px",
        }),
      ])
    )
  ),
  transition(
    "visible => hidden",
    animate(
      "200ms ease-out",
      keyframes([
        style({
          opacity: 1,
          visibility: "visible",
          height: "210px",
        }),
        style({
          opacity: 0,
          visibility: "hidden",
          height: "0px",
        }),
      ])
    )
  ),
]);
