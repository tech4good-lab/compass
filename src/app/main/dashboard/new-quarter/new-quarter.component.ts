import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

/** Prompt to reorient at the beginning of a new quarter. */
@Component({
  selector: 'app-new-quarter',
  templateUrl: './new-quarter.component.html',
  styleUrls: ['./new-quarter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewQuarterComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------
 
  /** Events for initiating quarterly reorientation. */
  @Output() reorient: EventEmitter<void> = new EventEmitter<void>();

  // --------------- LOCAL UI STATE ----------------------
  intro: string;
  time: string;
  gettext: string;
  
  constructor() { 
    this.intro = "It's a new quarter!";
    this.time= "Time to set some new goals.";
    this.gettext = "Get started";
  }
  
  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------
  getstartedclick(){
    console.log("button was clicked");
  }

  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
