import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { QuarterGoal } from '../../../../core/store/quarter-goal/quarter-goal.model';

/** Slide for setting up goals for the upcoming quarter. */
@Component({
  selector: 'app-quarter-goals-slide',
  templateUrl: './quarter-goals-slide.component.html',
  styleUrls: ['./quarter-goals-slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuarterGoalsSlideComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------
  @Output() nextSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() changedQuarterGoals: EventEmitter<QuarterGoal[]> = new EventEmitter<QuarterGoal[]>();
  @Input() quarterGoals: QuarterGoal[]
  @Input() userId: string

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
    console.log(this.userId)
    this.changedQuarterGoals.emit([
      {
        __id: "",
        __userId: this.userId,
        text: "string 1",
        completed: false
      },
      {
        __id: "",
        __userId: this.userId,
        text: "string 2",
        completed: false
      },
      {
        __id: "",
        __userId: this.userId,
        text: "string 3",
        completed: false
      },
    ])
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}