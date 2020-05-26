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

  /** Events for initiating quarterly reorientation. */
  @Output() reorient: EventEmitter<void> = new EventEmitter<void>();

  // --------------- LOCAL UI STATE ----------------------
  //@Input() message: ChangeDetectionStrategy;
  header_text:string = "It's a new quarter!";
  header_text_2: string = "Time to set some new goals.";
  button_text:string = "Get started";


  constructor() {

  }

  ngOnInit() {
    
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------

  // --------------- OTHER -------------------------------
}
