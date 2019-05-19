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

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
    console.log(this.events)
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------

  // TrackBy function
  trackByFunction(index, event) {
  return event.__id;
  }
}
