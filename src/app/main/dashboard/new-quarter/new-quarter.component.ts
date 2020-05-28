import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */
/** NOT MY GROUP SUBMISSION DO NOT GRADE */

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
 

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------
 reorientNow() {
   console.log("reorient")
 }

  // --------------- OTHER -------------------------------
}
