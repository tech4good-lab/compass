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
 
  g1: string;
  g2: string;
  g3: string;
  date: string;
  constructor() {
    this.g1='Finish Google Cover letter';
    this.g2='Apply to Microsoft';
    this.g3='Practice implementing data structures'
    this.date = '9/24 - 9/30'
   }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER ------------------------------- <div class ='title'>This Week's Goals</div>
 //<div class ='date'> {{date}}</div>
}
