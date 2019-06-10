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

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() {
    this.QuarterGoal = [
      {one: 'Finish cover letters'
      }, 
      {two: 'Apply to at least 50 internships'
      }, 
      {three: 'Finish technical interview prep'
      }]
   }

  ngOnInit() {
    console.log(QuarterGoal);
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
