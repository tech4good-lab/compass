import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { LongTermGoals } from '../../../../core/store/user/user.model';

/** Slide for setting up long-term goals. */
@Component({
  selector: 'app-long-term-goals-slide',
  templateUrl: './long-term-goals-slide.component.html',
  styleUrls: ['./long-term-goals-slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LongTermGoalsSlideComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------
  @Output() nextSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() longTermGoals: EventEmitter<LongTermGoals> = new EventEmitter<LongTermGoals>();
  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
   
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}