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
  monthNames: string[];

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() {
    this.monthNames =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
  }
  //2019-06-09T08:22:47.772Z

  ngOnInit() {
    console.log(this.time);
    console.log(this.time.getDate());

  }

  // --------------- DATA BINDING FUNCTIONS --------------
  formattedDate() {
    return this.monthNames[this.time.getMonth()] + " " + this.time.getDate() + "th, " + this.time.getFullYear();
  }

  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
