import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

/** Displays the goals for the quarter. */
@Component({
  selector: 'app-quarter-goals-card',
  templateUrl: './quarter-goals-card.component.html',
  styleUrls: ['./quarter-goals-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuarterGoalsCardComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------
  

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}