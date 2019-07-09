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
import { LoadUser, UpdateUser, UserActionTypes } from '../../../core/store/user/user.actions';
import { LoadQuarterGoal, UpdateQuarterGoal, AddQuarterGoal } from '../../../core/store/quarter-goal/quarter-goal.actions';
import { LoadWeekGoal, AddWeekGoal, UpdateWeekGoal } from '../../../core/store/week-goal/week-goal.actions';
import { LoadCalendarEvent } from '../../../core/store/calendar-event/calendar-event.actions';
import { firestore } from 'firebase/app';
import { FirebaseMockService } from '../../../core/firebase/firebase.mock.service';

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
      switch (action.payload.stateVar) {
        //Note to david: we had a hard time figuring out what the best way to update the mock db was, like newVal could contain the current user or just the long term goals and other metadata... we decided to use user as a whole because that was easiest.
        case "LTG":
          this.store.dispatch( new UpdateUser(
            action.payload.newVal.__id,
            {
              longTermGoals: action.payload.newVal.longTermGoals,
              setupInProgress: {
                type: action.payload.newVal.type,
                currentStep: action.payload.newVal.currentStep,
                longTermGoals: action.payload.newVal.setupInProgress.longTermGoals
              }
            }
          ))
         
        break;
        case "Initial Quarter Goals":
          this.store.dispatch( new AddQuarterGoal(
            action.payload.newVal
          ))
          break;

          case "Quarter Goals":
          this.store.dispatch( new UpdateQuarterGoal(
            action.payload.newVal.__id,
            {
              text: action.payload.newVal.text,
              _updatedAt: firestore.Timestamp.now()
            }
          ))
          break;
          case "Initial Week Goals":
          this.store.dispatch( new AddWeekGoal(
            action.payload.newVal
          ))
          break;
          case "Week Goals":
            console.log("here")
            console.log(action.payload.newVal)
          this.store.dispatch( new UpdateWeekGoal(
            action.payload.newVal.__id,
            {
              text: action.payload.newVal.text,
              _updatedAt: firestore.Timestamp.now(),
            }
          ))
          break;
          case "Week Hashtag":
          this.store.dispatch( new UpdateWeekGoal(
            action.payload.newVal.__id,
            {
              hashtag: action.payload.newVal.hashtag
            }
          ))
          break;
          case "Complete Week":
          this.store.dispatch( new UpdateWeekGoal(
            action.payload.newVal.__id,
            {
              completed: action.payload.newVal.completed,
              completedAt: firestore.Timestamp.now()
            }
          ))
          break;
          case "Complete Quarter":
          this.store.dispatch( new UpdateQuarterGoal(
            action.payload.newVal.__id,
            {
              completed: action.payload.newVal.completed,
              completedAt: firestore.Timestamp.now()

            }
          ))
          break;
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
    private eh: EffectsHelpers,
  ) {}
}