import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../core/store/user/user.model';

/** The greeting and Google search component */
@Component({
  selector: 'app-greeting-search',
  templateUrl: './greeting-search.component.html',
  styleUrls: ['./greeting-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GreetingSearchComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current user. */
  @Input() user: User;

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
