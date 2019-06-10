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
  title: string;
  hashtags: string[];
  hours: number[];

  constructor() { 
    this.title = 'This Week\'s Plans';
    this.hashtags = ['#interview','#coverletter','#internapps'];
    this.hours = [ 4, 3, 2];
  }

  ngOnInit() {
  }
  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
