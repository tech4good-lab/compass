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
  goal: string[];
  // --------------- LOCAL UI STATE ----------------------

  constructor() {
    this.goal = ["Finish Google cover letter", "Apply to Microsoft", "Practice implementing data structures"]
    this.startOfWeek =  new Date(2020, 4, 24, 10, 55, 30, 0);
    
   }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------
  endOfWeek() {
    return this.startOfWeek.getMonth() + 1 + "/" + (this.startOfWeek.getDate() + 7)
  }
  // --------------- EVENT BINDING FUNCTIONS -------------
  edit() {
    console.log("Editing the goals now!");
    this.editGoals.emit();
  }
  // --------------- OTHER -------------------------------
}
