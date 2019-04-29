import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../core/store/app.reducer';
import { EntitySelectorService } from '../../../core/store/app.selectors';

import { Observable, of, combineLatest } from 'rxjs';
import { bufferTime, distinctUntilChanged, shareReplay, mergeMap, filter, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompletedSelectors {

  cId = this.slRx.createId();

  constructor(
    private slRx: EntitySelectorService
  ) { }

  cleanup() {
    this.slRx.release(this.cId);
  }
}