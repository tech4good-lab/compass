import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { QuarterGoal } from '../../../../core/store/quarter-goal/quarter-goal.model';
import { QuarterDates } from '../../+state/dashboard.model';

/** Displays the goals for the quarter. */
@Component({
  selector: 'app-quarter-goals-card',
  templateUrl: './quarter-goals-card.component.html',
  styleUrls: ['./quarter-goals-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuarterGoalsCardComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------

  /** The start of the week. */
  @Input() startOfWeek: Date;

  /** Goals for a quarter. */
  @Input() goals: QuarterGoal[];

  /** The dates and times associated with a certain quarter */
  @Input() currentQuarter: QuarterDates

  /** Edit quarterly goals events. */
  @Output() editGoals: EventEmitter<QuarterGoal[]> = new EventEmitter<QuarterGoal[]>();

  // --------------- LOCAL UI STATE ----------------------
  currQuarter: string;
  quarterDates: []

  constructor() { 
    
  }

  ngOnInit() {
    console.log(this.startOfWeek)
    console.log(this.goals)
    console.log(this.currentQuarter)
  }

  // --------------- DATA BINDING FUNCTIONS --------------

  getDate(date:Date) {
    console.log(date)
    let month = date.getMonth() + 1
    let day = date.getDate()
    console.log(month)
    return month + '/' + day
  }
  // --------------- EVENT BINDING FUNCTIONS -------------

  edit() {
    console.log("Editing!")
  }

  // --------------- OTHER -------------------------------
  trackByFn(index, item) {
    return index;
  }
}
