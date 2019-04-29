import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { LongTermGoals } from '../../../../core/store/user/user.model';

/** Displays the long-term goals. */
@Component({
  selector: 'app-long-term-goals-card',
  templateUrl: './long-term-goals-card.component.html',
  styleUrls: ['./long-term-goals-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LongTermGoalsCardComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------

  /** The long-term goals. */
  @Input() goals: LongTermGoals;
  
  /** Edit long-term goals events. */
  @Output() editGoals: EventEmitter<LongTermGoals> = new EventEmitter<LongTermGoals>();

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
