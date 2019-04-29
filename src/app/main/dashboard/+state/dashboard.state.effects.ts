import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromStore from '../../../core/store/app.reducer';
import { FirebaseService } from '../../../core/firebase/firebase.service';
import { firestore } from 'firebase/app';
import { EffectsHelpers } from '../../../core/store/effects.helpers';
import { DashboardState } from './dashboard.state';

import { ActionFlow, LoadAction, Unsubscribe } from '../../../core/store/app.actions';
import { DashboardStateActionTypes, UpdateState, Cleanup, LoadData } from './dashboard.state.actions';
import { LoadUser } from '../../../core/store/user/user.actions';
import { LoadQuarterGoal } from '../../../core/store/quarter-goal/quarter-goal.actions';
import { LoadWeekGoal } from '../../../core/store/week-goal/week-goal.actions';
import { LoadCalendarEvent } from '../../../core/store/calendar-event/calendar-event.actions';

@Injectable()
export class DashboardStateEffects {

  loadId = this.db.createId();

  /** Load data from Firebase. */
  @Effect()
  loadData$: Observable<Action> = this.actions$.pipe(
    ofType<LoadData>(DashboardStateActionTypes.LOAD_DATA),
    mergeMap((action: LoadData) => {
      const startOfWeek = firestore.Timestamp.fromDate(action.payload.startOfWeek);
      return [
        new LoadUser([['__id', '==', action.payload.currentUser.__id]], {}, this.loadId),
        new LoadQuarterGoal([['__userId', '==', action.payload.currentUser.__id], ['completed', '==', false]], {}, this.loadId),
        new LoadWeekGoal([['__userId', '==', action.payload.currentUser.__id], ['completed', '==', false]], {}, this.loadId, (wk) => [
          new LoadCalendarEvent([['__weekGoalId', '==', wk.__id], ['start', '>=', startOfWeek]], {}, this.loadId)
        ]),
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
