import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { WeekGoalProgress } from '../../+state/dashboard.model';

/** Displays the progress so far for this week. */
@Component({
  selector: 'app-week-progress-card',
  templateUrl: './week-progress-card.component.html',
  styleUrls: ['./week-progress-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekProgressCardComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------

  /** Plans and progress for the upcoming week. */
  @Input() plans: WeekGoalProgress[];

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
      console.log(this.plans);
  }

  // --------------- DATA BINDING FUNCTIONS --------------

  /** Function for calculating the length of the two bars */
  calculateLength(plan: WeekGoalProgress, calculationType: string) {
    if (calculationType == 'bar1') {
      return 170*(1-plan.totalCompletedMins/plan.totalAllocatedMins)
    } else if (calculationType == 'bar2') {
      return (170*plan.totalCompletedMins/plan.totalAllocatedMins)
    }
  }

  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
