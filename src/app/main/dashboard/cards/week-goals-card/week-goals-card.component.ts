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
  goalTitle:string = "This Week's Goals";
  //dateTitle:string = "9/24 - 9/30";
  bulletList:string[] = ['Finish Google cover letter', 'Apply to Microsoft', 'Practice implementing data structures'];
  listItem:string = this.bulletList[0];
  pencilIcon:string = "https://i.imgur.com/FTl1OYy.png";
  constructor() { }

  ngOnInit() {
    console.log(this.startOfWeek)
    console.log(this.goals)
  }
 
  // --------------- DATA BINDING FUNCTIONS --------------
  /*this function grabs the current start date of the week (month and day) from console
      and adds 6 days onto the variable "last date" of the week and returns 
      the last day of the week. We then will have our dates of the week in a proper 
      format after html doc has run */
      
  getOurDates(){
    var curDay = this.startOfWeek.getDate();
    var curMonth = this.startOfWeek.getMonth();
    var lastDate = curDay + 6;

    var newDate = new Date(2020, curMonth, lastDate, 0,0,0,0);
    return newDate;
  }

  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}