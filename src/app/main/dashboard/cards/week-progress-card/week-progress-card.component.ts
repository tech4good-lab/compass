import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

/** Displays the progress so far for this week. */
@Component({
  selector: 'app-week-progress-card',
  templateUrl: './week-progress-card.component.html',
  styleUrls: ['./week-progress-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekProgressCardComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------
  

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}