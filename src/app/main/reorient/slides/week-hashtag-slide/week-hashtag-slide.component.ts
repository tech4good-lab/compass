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
  @Input() weekGoals: WeekGoal[]

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}