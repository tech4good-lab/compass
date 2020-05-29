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
  makeHashtag(summary) {
    let arr = summary.split(" ")
    let word = arr.join("")
    let hashtag = word.toLowerCase()

    return hashtag
  }

  randomGradient() {
    let randomColor1 = Math.floor(Math.random()*16777215).toString(16);
    let randomColor2 = Math.floor(Math.random()*16777215).toString(16);
    console.log(randomColor1)

    return "linear-gradient(90.81deg, #" + randomColor1.toString() + " -3.96%, #" + randomColor2.toString() + " 110.33%)"
  }

  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
