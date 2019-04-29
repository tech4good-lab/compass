import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

/** Plain setup slide with title and subtitle. */
@Component({
  selector: 'app-text-slide',
  templateUrl: './text-slide.component.html',
  styleUrls: ['./text-slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextSlideComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------
  

  // --------------- LOCAL UI STATE ----------------------
 

  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}