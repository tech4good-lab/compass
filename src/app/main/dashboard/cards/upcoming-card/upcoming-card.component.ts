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
  header_text:string = "Upcoming Events";

  constructor() { }

  ngOnInit() {
    //console.log(this.events);
  }


  convertTimeStamp(timestamp){
    let converted = new Date(timestamp*1000); //???
    console.log("This is converted", converted.toDateString());

    var currentHour = converted.getHours();
    if (currentHour >= 12){
      return currentHour-12+" PM"
    }
    else{
      return currentHour+" AM"
    }
  }
  

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
