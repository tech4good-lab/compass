import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PrePostTestAnimations } from './pre-post-test.animations';

/** the starting place for the pre-post test */
@Component({
  selector: 'app-pre-post-test',
  templateUrl: './pre-post-test.component.html',
  styleUrls: ['./pre-post-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: PrePostTestAnimations,
})
export class PrePostTestComponent implements OnInit {

  // --------------- INPUTS AND OUTPUTS ------------------


  // --------------- LOCAL UI STATE ----------------------


  constructor() { }

  ngOnInit() {
  }

  // --------------- DATA BINDING FUNCTIONS --------------


  // --------------- EVENT BINDING FUNCTIONS -------------


  // --------------- OTHER -------------------------------
}
