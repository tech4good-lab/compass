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
  imageUrl:string = "https://i.imgur.com/PmiIjUC.png"
  titleText:string = "It's a new quarter!";
  subText:string = "Time to set some new goals.";
  gButton:string = "Get started";
  
  constructor() {    

  }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
