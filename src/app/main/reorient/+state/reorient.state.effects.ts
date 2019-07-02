import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromStore from '../../../core/store/app.reducer';
import { FirebaseService } from '../../../core/firebase/firebase.service';
import { EffectsHelpers } from '../../../core/store/effects.helpers';
import { ReorientState } from './reorient.state';

import { ActionFlow, LoadAction, Unsubscribe } from '../../../core/store/app.actions';
import { ReorientStateActionTypes, UpdateState, Cleanup, LoadData } from './reorient.state.actions';
import { LoadUser } from '../../../core/store/user/user.actions';
import { LoadQuarterGoal } from '../../../core/store/quarter-goal/quarter-goal.actions';
import { LoadWeekGoal } from '../../../core/store/week-goal/week-goal.actions';
import { LoadCalendarEvent } from '../../../core/store/calendar-event/calendar-event.actions';
import { firestore } from 'firebase/app';

@Injectable()
export class ReorientStateEffects {

  loadId = this.db.createId();

  /** Load data from Firebase. */
  @Effect()
  loadData$: Observable<Action> = this.actions$.pipe(
    ofType<LoadData>(ReorientStateActionTypes.LOAD_DATA),
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
    ofType<UpdateState>(ReorientStateActionTypes.UPDATE_STATE),
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
    ofType<Cleanup>(ReorientStateActionTypes.CLEANUP),
    map((action: Cleanup) => new Unsubscribe(this.loadId))
  );

  constructor(
    private actions$: Actions, 
    private store: Store<fromStore.State>, 
    private state: ReorientState, 
    private db: FirebaseService, 
    private eh: EffectsHelpers
  ) {}
}