import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SetQuarterGoalsAnimations } from './set-quarter-goals.animations';

/** Set quarterly goals */
@Component({
  selector: 'app-set-quarter-goals',
  templateUrl: './set-quarter-goals.component.html',
  styleUrls: ['./set-quarter-goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: SetQuarterGoalsAnimations,
})
export class SetQuarterGoalsComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------


  // --------------- LOCAL UI STATE ----------------------


  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
