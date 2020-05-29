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
    console.log(this.events);
  }
  getDate(ts) {
    var date = new Date(ts*1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var hourString = hours + "";
    var suffixString = "AM"
    if(hours >= 12){
      if (hours > 12){
        hours = hours - 12;
      }
      hourString = hours + "";
      suffixString = "PM"
    }
    var minuteString = minutes + "";
    if (minutes < 10) {
      minuteString = "0" + minutes + "";
    }
    //return hourString + ":" + minuteString + "" + suffixString;
    return hourString + suffixString;
  }

  randomGradient() {
    var randomColor1 = Math.floor(Math.random()*16777215).toString(16);
    var white = 0xffffff;
    return "linear-gradient(90.81deg, #" + randomColor1.toString() + " -3.96%, #" + white.toString() + " 130.33%)"
  }

  removeSpaces(st) {
    var kwArray = st.split(" ");
    var word = kwArray.join("");
    return word;
  }
  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
