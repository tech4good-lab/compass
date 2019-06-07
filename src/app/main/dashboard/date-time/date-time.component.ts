import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { stringify } from '@angular/core/src/util';

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
getAMPM() {
  var ret = "AM"
  var hour = this.time.getHours();
  if (hour >= 12) {
    ret = "PM"
  }
  return ret;
}
getMinutes() {
  return this.time.toLocaleString('en-US').split(",")[1].split(":")[1].trim();
}
getHour() {
  return this.time.toLocaleString('en-US').split(",")[1].split(":")[0].trim();
}
 getMonthName() {
   return this.time.toLocaleString('en-US', { month: "long" });
 }
 
 getDay() {
   return this.time.getDay(); 
 }
 getYear() {
   return this.time.getFullYear()
 }

  constructor() {
  }

  ngOnInit() {

    // console.log(this.time | date : 'a');
    // console.log(this.time.getDay());
    // console.log(this.time.getFullYear())
    return this.time.toLocaleString('en-US', { a: "long" });
    // console.log(this.getMonthName());
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
