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
 @Input() header: header['lolasdf'];
  /** Events for initiating quarterly reorientation. */
  @Output() reorient: EventEmitter<void> = new EventEmitter<void>();

  // --------------- LOCAL UI STATE ----------------------
  header: string;
  description: string;
  action: string;
  constructor() {
    this.header = 'Its a new quarter!';
    this.description = 'Time to set some new goals.';
    this.action = 'Get Started';
  
  }
  t

  ngOnInit() {}

  // --------------- DATA BINDING FUNCTIONS --------------

  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
  
}
