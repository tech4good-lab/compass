import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromStore from '../../../core/store/app.reducer';
import { FirebaseService } from '../../../core/firebase/firebase.service';
import { EffectsHelpers } from '../../../core/store/effects.helpers';
import { DashboardState } from './dashboard.state';

import { ActionFlow, LoadAction, Unsubscribe } from '../../../core/store/app.actions';
import { DashboardStateActionTypes, UpdateState, Cleanup, LoadData } from './dashboard.state.actions';

@Injectable()
export class DashboardStateEffects {

  loadId = this.db.createId();

  /** Load data from Firebase. */
  @Effect()
  loadData$: Observable<Action> = this.actions$.pipe(
    ofType<LoadData>(DashboardStateActionTypes.LOAD_DATA),
    mergeMap((action: LoadData) => {
      return [
      ];
    })
  );

  /** Update state. */
  @Effect({ dispatch: false })
  updateState$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateState>(DashboardStateActionTypes.UPDATE_STATE),
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
    ofType<Cleanup>(DashboardStateActionTypes.CLEANUP),
    map((action: Cleanup) => new Unsubscribe(this.loadId))
  );

  constructor(
    private actions$: Actions, 
    private store: Store<fromStore.State>, 
    private state: DashboardState, 
    private db: FirebaseService, 
    private eh: EffectsHelpers
  ) {}
}