import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { WeekGoal } from '../../../../core/store/week-goal/week-goal.model';
 
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
 
 
  // --------------- DATA BINDING FUNCTIONS --------------
  endOfWeek: Date;

  ngOnInit() {
    this.endOfWeek = new Date();
    this.endOfWeek.setDate( this.startOfWeek.getDate() + 6 );
  }
  
  // --------------- EVENT BINDING FUNCTIONS -------------
  /** Function for emmiting an edit goals */
  edit() {

    console.log("Editing Now!");
    this.editGoals.emit();
  }
 
  // --------------- OTHER -------------------------------
}
