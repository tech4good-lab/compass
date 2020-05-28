import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

/** Prompt to reorient at the beginning of a new quarter. */
@Component({
  selector: "app-new-quarter",
  templateUrl: "./new-quarter.component.html",
  styleUrls: ["./new-quarter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewQuarterComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------
  quarter_headline:string;
  goals:string;
  buttontext:string;
  /** Events for initiating quarterly reorientation. */
    

  // --------------- LOCAL UI STATE ----------------------

  constructor() {
    this.quarter_headline = "It's a new quarter!";
    this.goals = "Time to set some new goals.";
    this.buttontext = "Get started";
  }

  ngOnInit() {}

  // --------------- DATA BINDING FUNCTIONS --------------

  // --------------- EVENT BINDING FUNCTIONS -------------

  // --------------- OTHER -------------------------------
}
