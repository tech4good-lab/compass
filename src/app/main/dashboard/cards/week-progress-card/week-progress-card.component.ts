import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { WeekGoalProgress } from '../../+state/dashboard.model';
import { stringify } from '@angular/core/src/util';
import { MAX_UNSIGNED_VALUE, MAX_VALUE } from 'long';
// import { stringify } from 'querystring';
// import { stringify } from '@angular/core/src/render3/util';

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
  
  getPlan(planNum) {
    // returns plan number planNum
    return this.plans[planNum];
  }

  getProgressBar(planNum) {
    // returns the percentage that the completed part of the progress bar should take up
    var thisPlan = this.getPlan(planNum);
    var fp = (thisPlan.totalCompletedMins / thisPlan.totalAllocatedMins) * 100;
    // console.log(fp);
    return +fp + "%";

  }

  getHours(planNum) {
    // returns the number of hours that plan number planNum is going to take
    return (+this.plans[planNum].totalAllocatedMins / 60);

  }
  
  getPercentage(minutesAllocated) {
    // returns the maximum width that that plan number planNum's progress bar will take up (if 100% bold)
    var hoursAllocated = minutesAllocated / 60;
    var percentage = (hoursAllocated * 18) + hoursAllocated;
    if (percentage > 100) {
      return "100%";
    }
    return (+percentage) + "%";
  }


  getMaxWidth(planNum) {
    // this calls the getPercentage function to get the total width of the progress bar (based on the planNum)
    return this.getPercentage(this.plans[planNum].totalAllocatedMins);
  }




  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
