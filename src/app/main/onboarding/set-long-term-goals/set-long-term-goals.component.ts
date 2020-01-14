import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SetLongTermGoalsAnimations } from './set-long-term-goals.animations';

/** Set long term goals */
@Component({
  selector: 'app-set-long-term-goals',
  templateUrl: './set-long-term-goals.component.html',
  styleUrls: ['./set-long-term-goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: SetLongTermGoalsAnimations,
})
export class SetLongTermGoalsComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------


  // --------------- LOCAL UI STATE ----------------------


  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
