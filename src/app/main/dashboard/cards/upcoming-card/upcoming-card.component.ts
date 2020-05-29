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
 
  cardTitle:string = "Upcoming Events";
  cardSub1:string = "TODAY";
  cardSub2:string = "TOMORROW";

  // Info for Today Bars
  todayTasks:string[] = ['#interview', '#coverletter'];
  todayTimes:string[] = ['1 - 3 pm', '7 - 8 pm'];
  task:string = this.todayTasks[0]; 
  time:string = this.todayTimes[0];

  // Info for Tomorrow Bars
  tomorrowTask:string = "#apply";
  tomorrowTime:string = "10 - 11 am";

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
