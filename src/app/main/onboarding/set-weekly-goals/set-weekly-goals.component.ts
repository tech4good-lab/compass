import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SetWeeklyGoalsAnimations } from './set-weekly-goals.animations';

/** Set weekly goals */
@Component({
  selector: 'app-set-weekly-goals',
  templateUrl: './set-weekly-goals.component.html',
  styleUrls: ['./set-weekly-goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: SetWeeklyGoalsAnimations,
})
export class SetWeeklyGoalsComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------


  // --------------- LOCAL UI STATE ----------------------


  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
