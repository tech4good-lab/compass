import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { NiceWorkAnimations } from './nice-work.animations';

/** Question that is asked before inputting quarterly goals */
@Component({
  selector: 'app-nice-work',
  templateUrl: './nice-work.component.html',
  styleUrls: ['./nice-work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: NiceWorkAnimations,
})
export class NiceWorkComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------


  // --------------- LOCAL UI STATE ----------------------


  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
