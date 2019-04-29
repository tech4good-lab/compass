import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

/** Prompt to reorient at the beginning of a new week */
@Component({
  selector: 'app-new-week',
  templateUrl: './new-week.component.html',
  styleUrls: ['./new-week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewWeekComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------

  /** Events for initiating weekly reorientation. */
  @Output() reorient: EventEmitter<void> = new EventEmitter<void>();

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
