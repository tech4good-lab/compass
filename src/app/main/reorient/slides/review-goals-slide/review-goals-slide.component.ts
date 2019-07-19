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
  @Output() checkWeekGoals: EventEmitter<WeekGoal[]> = new EventEmitter<WeekGoal[]>();
  @Output() checkQuarterGoals: EventEmitter<QuarterGoal[]> = new EventEmitter<QuarterGoal[]>();
  @Input() weekGoals: WeekGoal[]
  @Input() quarterGoals: QuarterGoal[]

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
    let wkgl1 = this.weekGoals[0]
    let wkgl2 = this.weekGoals[1]
    let wkgl3 = this.weekGoals[2]
    let qtrgl1 = this.quarterGoals[0]
    let qtrgl2 = this.quarterGoals[1]
    let qtrgl3 = this.quarterGoals[2]
    wkgl1.completed = false;
    wkgl3.completed = true;
    qtrgl1.completed = true;
    qtrgl3.completed = true;
    this.checkQuarterGoals.emit([qtrgl1, qtrgl2, qtrgl3])
    this.checkWeekGoals.emit([wkgl1, wkgl2, wkgl3])
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}