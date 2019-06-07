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
  month: string;
  // --------------- LOCAL UI STATE ----------------------
getHour() {
  this.time.toLocaleString();
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
    

    this.month = "";
   }

  ngOnInit() {
    // console.log(this.time | date : 'a');
    console.log(this.time.getDay());
    console.log(this.time.getFullYear())
    
    console.log(this.getMonthName());
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
