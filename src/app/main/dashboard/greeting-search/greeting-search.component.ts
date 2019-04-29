import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

/** The greeting and Google search component */
@Component({
  selector: 'app-greeting-search',
  templateUrl: './greeting-search.component.html',
  styleUrls: ['./greeting-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GreetingSearchComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------
  

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}