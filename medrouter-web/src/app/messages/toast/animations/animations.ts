import {
  trigger,
  style,
  transition,
  animate,
  state,
  query,
  animateChild,
  group,
  keyframes,
} from "@angular/animations";

export const ToastVisibility = trigger("toast-visibility", [
  state(
    "hidden",
    style({
      right: "0px",
      opacity: 0,
      visibility: "hidden",
    })
  ),
  state(
    "visible",
    style({
      right: "100px",
      opacity: 1,
      visibility: "visible",
    })
  ),
  transition(
    "hidden => visible",
    group([
      query("@load", [animateChild()]),
      animate(
        "300ms ease-out",
        keyframes([
          style({
            opacity: 0,
            right: "0px",
            visibility: "hidden",
          }),
          style({
            opacity: 1,
            right: "80px",
            visibility: "visible",
          }),
          style({
            opacity: 1,
            right: "50px",
            visibility: "visible",
          }),
          style({
            opacity: 1,
            right: "80px",
            visibility: "visible",
          }),
          style({
            opacity: 1,
            right: "50px",
            visibility: "visible",
          }),
        ])
      ),
    ])
  ),
  ,
  transition("visible => hidden", [
    group([
      query("@load", [animateChild()]),
      animate(
        "300ms ease-out",
        keyframes([
          style({
            opacity: 1,
            right: "100px",
            visibility: "visible",
            //transform: "translateY(-10px)",
          }),
          style({
            opacity: 1,
            right: "80px",
            visibility: "visible",
            //transform: "translateY(-15px)",
          }),
          style({
            opacity: 0,
            right: "0px",
            visibility: "hidden",
            //transform: "translateY(-20px)",
          }),
        ])
      ),
    ]),
  ]),
]);

export const Load = trigger("load", [
  state("hidden", style({ opacity: 1, width: "100%" })),
  state("visible", style({ opacity: 1, width: "0%" })),
  transition("hidden => visible", [animate("{{load}}ms ease-out")], {
    params: { load: 1000 },
  }),
]);
