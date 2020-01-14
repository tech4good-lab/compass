import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PlanWeeklyGoalsAnimations } from './plan-weekly-goals.animations';

/** This is a question that is asked before setting weekly goals. */
@Component({
  selector: 'app-plan-weekly-goals',
  templateUrl: './plan-weekly-goals.component.html',
  styleUrls: ['./plan-weekly-goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: PlanWeeklyGoalsAnimations,
})
export class PlanWeeklyGoalsComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------


  // --------------- LOCAL UI STATE ----------------------


  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
