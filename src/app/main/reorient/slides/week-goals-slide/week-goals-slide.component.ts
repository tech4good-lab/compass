import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { WeekGoal } from '../../../../core/store/week-goal/week-goal.model';

/** Slide for setting up goals for the upcoming week. */
@Component({
  selector: 'app-week-goals-slide',
  templateUrl: './week-goals-slide.component.html',
  styleUrls: ['./week-goals-slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekGoalsSlideComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------
  @Output() nextSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() changedWeekGoals: EventEmitter<WeekGoal[]> = new EventEmitter<WeekGoal[]>();
  @Input() weekGoals: WeekGoal[]
  @Input() userId: string

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
    this.changedWeekGoals.emit([
      {
        __id: "hi",
        __userId: this.userId,
        text: "string 1",
        completed: false,
        index: 0,
        hashtag: ""
      },
      {
        __id: "mm",
        __userId: this.userId,
        text: "string 2",
        completed: false,
        index: 0,
        hashtag: ""
      },
      {
        __id: "cc",
        __userId: this.userId,
        text: "string 3",
        completed: false,
        index: 0,
        hashtag: ""
      },
    ])
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}