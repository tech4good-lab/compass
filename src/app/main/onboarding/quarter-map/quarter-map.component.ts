import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { QuarterMapAnimations } from './quarter-map.animations';

/** Mapping quarterly goals to a hashtag */
@Component({
  selector: 'app-quarter-map',
  templateUrl: './quarter-map.component.html',
  styleUrls: ['./quarter-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: QuarterMapAnimations,
})
export class QuarterMapComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------


  // --------------- LOCAL UI STATE ----------------------


  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
