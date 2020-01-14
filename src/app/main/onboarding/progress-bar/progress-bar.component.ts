import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProgressBarAnimations } from './progress-bar.animations';

/** Progress bar */
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: ProgressBarAnimations,
})
export class ProgressBarComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------


  // --------------- LOCAL UI STATE ----------------------


  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
