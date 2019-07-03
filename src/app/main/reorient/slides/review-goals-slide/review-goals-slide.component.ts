import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { WeekGoal } from '../../../../core/store/week-goal/week-goal.model';
import { QuarterGoal } from '../../../../core/store/quarter-goal/quarter-goal.model';

/** Slide for reviewing weekly and quarterly goals. */
@Component({
  selector: 'app-review-goals-slide',
  templateUrl: './review-goals-slide.component.html',
  styleUrls: ['./review-goals-slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewGoalsSlideComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------
  @Output() nextSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevSlide: EventEmitter<void> = new EventEmitter<void>();
  @Input() weekGoals: WeekGoal[]
  @Input() quarterGoals: QuarterGoal[]

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}