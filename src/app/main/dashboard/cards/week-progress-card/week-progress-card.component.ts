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
  getMaxTime(){
    var max = 0;
    for( let time of this.plans){
        if(time.totalAllocatedMins > max){
          max = time.totalAllocatedMins;
        }
    }
    return max;
  }
  hours(ind){
    return Math.floor(this.plans[ind].totalAllocatedMins/60);
  }
  lightSize(ind){
    var maxSize = this.getMaxTime();
    if( this.plans[ind].totalAllocatedMins < maxSize){
      return Math.floor((this.plans[ind].totalAllocatedMins/maxSize)*100)+'%';
    }else{
      return 75 +'%';
    }
  }
  boldSize(ind){
    return Math.floor((this.plans[ind].totalCompletedMins/this.plans[ind].totalAllocatedMins)*100)+'%';
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
