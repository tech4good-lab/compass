import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { WeekGoal } from '../../../../core/store/week-goal/week-goal.model';

/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */
/** NOT GROUP CODE DO NOT GRADE. */

/** Displays the weekly goals. */
@Component({
  selector: 'app-week-goals-card',
  templateUrl: './week-goals-card.component.html',
  styleUrls: ['./week-goals-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekGoalsCardComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------
  
  /** The start of the week. */
  @Input() startOfWeek: Date;

  /** Goals for a week. */
  @Input() goals: WeekGoal[];

  /** Edit weekly goals events. */
  @Output() editGoals: EventEmitter<WeekGoal[]> = new EventEmitter<WeekGoal[]>();

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  getEndDate() {
    var curr = this.startOfWeek; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();
    console.info(firstday)
    console.info(lastday)
  }


  ngOnInit() {
    console.info(this.startOfWeek)
    console.info(this.goals)
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
