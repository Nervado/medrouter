import { Component, OnInit, forwardRef, Input, OnDestroy } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  faCheckSquare,
  faSquare,
  faClipboardList,
  faSearch,
  faSearchPlus,
  faSearchMinus,
} from "@fortawesome/free-solid-svg-icons";
import { MultiSelectOption } from "./models/options";
import { Colors } from "src/app/messages/toast/enums/colors";

@Component({
  selector: "app-mult-selector-drop-drown",
  templateUrl: "./mult-selector-drop-drown.component.html",
  styleUrls: ["./mult-selector-drop-drown.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultSelectorDropDrownComponent),
      multi: true,
    },
  ],
})
export class MultSelectorDropDrownComponent
  implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() value: Array<any> = [];
  show: boolean = false;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;
  faClipboardList = faClipboardList;
  faSearch = faSearch;
  faSearchPlus = faSearchPlus;
  faSearchMinus = faSearchMinus;
  onChange: any;
  total: number = 0;

  searchValue: string;

  @Input() states: Array<MultiSelectOption> = [];

  @Input() mainColor: Colors = Colors.ADMIN;

  oldStates: any;

  @Input() width: string = "260px";
  @Input() height: string = "50px";

  constructor() {}

  ngOnInit(): void {
    this.total = this.value.length;
    this.oldStates = this.states;
  }

  setValue(value: any) {
    const current =
      this.value !== null
        ? this.value.find((item) => item === value.value)
        : undefined;

    if (this.value === null) {
      this.value = [];
    }

    if (current !== undefined) {
      this.value = this.value.filter((el) => el !== value.value);
      this.helperSetSelected(value, false);
    } else {
      this.value.push(value.value);
      this.helperSetSelected(value, true);
    }
    this.total = this.value.length;
    this.onChange(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  submit() {
    console.log(this.value);
  }

  toggle() {
    this.show = !this.show;
  }

  hide() {
    this.show = false;
  }

  filter(e) {
    this.oldStates.map((el) =>
      this.states.map((sel) => {
        if (el.value === sel.value && el["selected"] !== sel["selected"]) {
          el["selected"] = sel["selected"];
          return el;
        } else {
          return el;
        }
      })
    );

    if (e.target.value === "") {
      this.states = this.oldStates;
    } else {
      this.states = this.states.filter((el) =>
        el.label.toLowerCase().match(e.target.value.toLowerCase())
      );
    }
  }

  helperSetSelected(value, set: boolean): void {
    this.states = this.states.map((el) => {
      if (el.label === value.label) {
        return { ...el, selected: set };
      } else {
        return el;
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.states = [];
  }
}
