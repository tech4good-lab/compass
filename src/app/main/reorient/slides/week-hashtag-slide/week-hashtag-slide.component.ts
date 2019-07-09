import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { WeekGoal } from '../../../../core/store/week-goal/week-goal.model';

/** Slide for setting up hashtags for weekly goals. */
@Component({
  selector: 'app-week-hashtag-slide',
  templateUrl: './week-hashtag-slide.component.html',
  styleUrls: ['./week-hashtag-slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekHashtagSlideComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------
  @Output() nextSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() changedWeekHashtag: EventEmitter<WeekGoal[]> = new EventEmitter<WeekGoal[]>();
  @Input() weekGoals: WeekGoal[]

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
    let i =0;
    let id1 =this.weekGoals[0].__id
    let id2=this.weekGoals[1].__id
    let id3=this.weekGoals[2].__id
    
    this.changedWeekHashtag.emit([
      {
        __id: id1,
        __userId: "test-user",
        text: "string 1",
        completed: false,
        index: 0,
        hashtag: "hello"
      },
      {
        __id: id2,
        __userId: "test-user",
        text: "string 2",
        completed: false,
        index: 0,
        hashtag: "yeehaw"
      },
      {
        __id: id3,
        __userId: "test-user",
        text: "string 3",
        completed: false,
        index: 0,
        hashtag: "janlit"
      },
    ])

    
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}