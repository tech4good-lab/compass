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

  /** The date representing the beginning of the current week */
  @Input() startOfWeek: Date;

  /** Goals for a quarter. */
  @Input() goals: QuarterGoal[];

  /** The dates and times associated with a certain quarter */
  @Input() currentQuarter: QuarterDates

  /** Edit quarterly goals events. */
  @Output() editGoals: EventEmitter<QuarterGoal[]> = new EventEmitter<QuarterGoal[]>();

  // --------------- LOCAL UI STATE ----------------------

  constructor() { }

  ngOnInit() {
    console.log(this.startOfWeek)
    console.log(this.goals)
  }

  // --------------- DATA BINDING FUNCTIONS --------------

  // --------------- EVENT BINDING FUNCTIONS -------------

  /** Function for emitting an edit goals event */
  edit() {
    console.log("Editing goals!")
  }

  // --------------- OTHER -------------------------------
}
