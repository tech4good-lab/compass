import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { HeadToDashboardAnimations } from './head-to-dashboard.animations';

/** Heading to dashboard after setting goals and assigning each goal a hashtag */
@Component({
  selector: 'app-head-to-dashboard',
  templateUrl: './head-to-dashboard.component.html',
  styleUrls: ['./head-to-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: HeadToDashboardAnimations,
})
export class HeadToDashboardComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------


  // --------------- LOCAL UI STATE ----------------------


  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
