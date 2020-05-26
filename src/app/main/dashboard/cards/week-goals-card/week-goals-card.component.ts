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
  
  header_text:string = "This Week's Goals";
  header_text_2: string = "Time to set some new goals.";
  button_text:string = "Get started";


  constructor() {

  }

  ngOnInit() {

    console.log(this.goals);
    console.log(this.startOfWeek);
  }

  // --------------- DATA BINDING FUNCTIONS --------------\

  calc(day) {

    var d = this.startOfWeek.getDate();
    var g = d + 6;
    return g;

    }
  

  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}


