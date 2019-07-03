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
  @Output() weekGoals: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() weekGoalsText: string[]

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}