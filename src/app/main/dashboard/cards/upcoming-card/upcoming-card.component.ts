import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { UpcomingEventsData } from '../../+state/dashboard.model';

/** Displays the upcoming events. */
@Component({
  selector: 'app-upcoming-card',
  templateUrl: './upcoming-card.component.html',
  styleUrls: ['./upcoming-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpcomingCardComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------

  /** Upcoming events. */
  @Input() events: UpcomingEventsData;

//  // Step 1. Get all the object keys.
//   keys = Object.keys(this.events);
//   // Step 2. Create an empty array.
//   array = [];
  

  // --------------- LOCAL UI STATE ----------------------

  constructor() {
  }

  ngOnInit() {
    // // Step 3. Iterate throw all keys.
    // for (const item of this.events) { 
    //   this.array.push(this.keys[item]);
    //   console.log(this.keys[item]);
    // } 
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}

