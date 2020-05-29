import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-quarter',
  templateUrl: './new-quarter.component.html',
  styleUrls: ['./new-quarter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewQuarterComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  /** Events for initiating weekly reorientation. */
  @Output() reorient: EventEmitter<void> = new EventEmitter<void>();

  // --------------- LOCAL UI STATE ----------------------
 

constructor() { }

ngOnInit() {
}

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------

  /** Function to handle when the start button is clicked. */
startButtonClicked() {
console.log("Sending message to console");
  }
}




