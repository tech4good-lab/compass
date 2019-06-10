import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { QuarterGoal } from '../../../../core/store/quarter-goal/quarter-goal.model';

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
  
  /** Edit quarterly goals events. */
  @Output() editGoals: EventEmitter<QuarterGoal[]> = new EventEmitter<QuarterGoal[]>();
  
  title: string;
  dates: string;
  numbers: number[];
  task: string[];
  
  // --------------- LOCAL UI STATE ----------------------
 
  constructor() { 
    this.title = 'Fall \'18 Goals';
    this.dates = '9/24-12/14';
    this.numbers = [1,2,3];
    this.task = [
      'Finish cover letters',
      'Apply to at least 50 internships',
      'Finish technical interview prep'
	];
  }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
