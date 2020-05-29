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
  cardTitle:string = "This Week's Goals"
  cardDate:string = "9/24 - 9/30";
  cardList:string[] = ['Finish Google cover letter', 'Apply to Microsoft', 'Practice implementing data structures'];
  listItem:string = this.cardList[0];
  


  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
