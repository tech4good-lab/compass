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

  ngOnInit(){

  
  console.log(this.startOfWeek)
  



  }

  // --------------- DATA BINDING FUNCTIONS --------------
  formattedWeek(){
    var current_day = this.startOfWeek.getDate();
    var current_month = this.startOfWeek.getMonth();
    var end_of_week_date = current_day + 6;

    var d = new Date(2020, current_month, end_of_week_date, 0,0,0,0);
    return d;

  }


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
