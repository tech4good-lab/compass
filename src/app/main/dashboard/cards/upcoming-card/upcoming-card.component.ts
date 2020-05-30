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
 

  constructor() {
      this.goal1="#interview";
      this.goal2="#coverletter"
      this.goal3="#apply"
      this.time1="1 - 3 pm"
      this.time2="7 - 8 pm"
      this.time3="10 - 11 am"
  }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
