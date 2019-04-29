import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromStore from '../../../core/store/app.reducer';
import { FirebaseService } from '../../../core/firebase/firebase.service';
import { EffectsHelpers } from '../../../core/store/effects.helpers';
import { NavbarState } from './navbar.state';

import { ActionFlow, LoadAction, Unsubscribe } from '../../../core/store/app.actions';
import { NavbarStateActionTypes, UpdateState, Cleanup, LoadData } from './navbar.state.actions';

@Injectable()
export class NavbarStateEffects {

  loadId = this.db.createId();

  /** Load data from Firebase. */
  @Effect()
  loadData$: Observable<Action> = this.actions$.pipe(
    ofType<LoadData>(NavbarStateActionTypes.LOAD_DATA),
    mergeMap((action: LoadData) => {
      return [
      ];
    })
  );

  /** Update state. */
  @Effect({ dispatch: false })
  updateState$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateState>(NavbarStateActionTypes.UPDATE_STATE),
    tap((action: UpdateState) => {
      switch (action.stateVar) {
        default:
          break;
      }
    })
  );

  /** Unsubscribe connections from Firebase. */
  @Effect()
  cleanup$: Observable<Action> = this.actions$.pipe(
    ofType<Cleanup>(NavbarStateActionTypes.CLEANUP),
    map((action: Cleanup) => new Unsubscribe(this.loadId))
  );

  constructor(
    private actions$: Actions, 
    private store: Store<fromStore.State>, 
    private state: NavbarState, 
    private db: FirebaseService, 
    private eh: EffectsHelpers
  ) {}
}