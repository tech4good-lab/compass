import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { WeekMapAnimations } from './week-map.animations';

/** Mapping weekly goals to a hashtag */
@Component({
  selector: 'app-week-map',
  templateUrl: './week-map.component.html',
  styleUrls: ['./week-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WeekMapAnimations,
})
export class WeekMapComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------


  // --------------- LOCAL UI STATE ----------------------


  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
