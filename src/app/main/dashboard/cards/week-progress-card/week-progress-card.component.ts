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
  // color: string;
  // widths: [string];
  // width1: string;
  // width2: string;
  // width3: string;
  // --------------- LOCAL UI STATE ----------------------
  
  getPlan(planNum) {
    return this.plans[planNum];
  }

  getPercentage(minutesAllocated) {
    // takes in the minutes allocated to give the % of width it needs
    var hoursAllocated = minutesAllocated/60;
    var percentage = (hoursAllocated * 18) + hoursAllocated;
    if (percentage > 100) {
      return "100%";
    }
    return (+percentage) + "%";
  }

  getHours(planNum) {
    return (+this.plans[planNum].totalAllocatedMins / 60);

  }
  getMaxWidth(planNum) {
    // return (+(this.plans[planNum].totalAllocatedMins / 60)+1) + "%";
    return this.getPercentage(this.plans[planNum].totalAllocatedMins);
      // for (var plan_num = 0; plan_num < 3; plan_num+=1) {
      // console.log("allocated: ", p);
      // console.log("completed: ", p.totalCompletedMins);
      // console.log("hashtag: ", p.hashtag);
      // console.log(p);
      // plan_num+=1
    }
    // this.width1 = "2%";  
  
  constructor() { }

  ngOnInit() {
    // this.color = "red";
    // this.setContainerWidths();
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
