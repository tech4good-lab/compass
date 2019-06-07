import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

/** Displays the date and time in the main dashboard view. */
@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimeComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current time. */
  @Input() time: Date;

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
    // console.log(this.time | date : 'a');
    console.log(this.time.getDay());
    console.log(this.time.getFullYear())
  }

  // --------------- DATA BINDING FUNCTIONS --------------
  // let getHours = function(time) {
  //   var date_time_str = time.toLocaleString("en-US");
  //   // var hours = date_time_str.
  //   return date_time_str.split(',')[1].split(':')[0].trim();
  // };

  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
