import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { empty, of, Observable, throwError, forkJoin, from, pipe, merge } from 'rxjs';
import { switchMap, flatMap, mergeMap, map, catchError, tap, take } from 'rxjs/operators';
import { FirebaseService } from '../../firebase/firebase.service';
import { CachedLoadConnectionsService } from '../cached-load-connections.service';

import { WeekGoal } from './week-goal.model';
import { WeekGoalActionTypes, WeekGoalActions,
  LoadWeekGoal, LoadWeekGoalSuccess, LoadWeekGoalFail, 
  AddWeekGoal, AddWeekGoalSuccess, AddWeekGoalFail,
  UpdateWeekGoal, UpdateWeekGoalSuccess, UpdateWeekGoalFail,
  UpsertWeekGoal, UpsertWeekGoalSuccess, UpsertWeekGoalFail,
  RemoveWeekGoal, RemoveWeekGoalSuccess, RemoveWeekGoalFail } from './week-goal.actions';

/** WeekGoal Effects */
@Injectable()
export class WeekGoalEffects {

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<LoadWeekGoal>(WeekGoalActionTypes.LOAD),
    mergeMap((action: LoadWeekGoal) => {
      const connection = this.clc.processLoadAction(action);
      return connection.loadStream.pipe(
        take(1),
        map(() => new LoadWeekGoalSuccess(action.queryParams, action.queryOptions, action.correlationId, action.followupActions)),
        catchError((error) => of(new LoadWeekGoalFail(error, action.correlationId)))
      )
    })
  );

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType<AddWeekGoal>(WeekGoalActionTypes.ADD),
    mergeMap((action: AddWeekGoal) => {
      return this.db.addEntity('weekGoals', action.weekGoal).pipe(
        mergeMap(() => merge(
          of(new AddWeekGoalSuccess(action.weekGoal, action.correlationId)),
          this.actionsOnAdd(action)
        )),
        catchError((error) => of(new AddWeekGoalFail(error, action.correlationId)))
      );
    })
  )

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateWeekGoal>(WeekGoalActionTypes.UPDATE),
    mergeMap((action: UpdateWeekGoal) => {
      return this.db.updateEntity('weekGoals', action.__id, action.changes).pipe(
        mergeMap(() => merge(
          of(new UpdateWeekGoalSuccess(action.__id, action.changes, action.correlationId)),
          this.actionsOnUpdate(action)
        )),
        catchError((error) => of(new UpdateWeekGoalFail(error, action.correlationId)))
      )
    })
  )

  @Effect()
  upsert$: Observable<Action> = this.actions$.pipe(
    ofType<UpsertWeekGoal>(WeekGoalActionTypes.UPSERT),
    mergeMap((action: UpsertWeekGoal) => {
      return this.db.upsertEntity('weekGoals', action.weekGoal).pipe(
        mergeMap((results) => merge(
          of(new UpsertWeekGoalSuccess(action.weekGoal, action.correlationId)),
          results.type === 'add' ? this.actionsOnAdd(new AddWeekGoal(action.weekGoal, action.correlationId)) : this.actionsOnUpdate(new UpdateWeekGoal(action.weekGoal.__id, action.weekGoal, action.correlationId))
        )),
        catchError((error) => of(new UpsertWeekGoalFail(error, action.correlationId)))
      );
    })
  )

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveWeekGoal>(WeekGoalActionTypes.REMOVE),
    mergeMap((action: RemoveWeekGoal) => {
      return this.db.removeEntity('weekGoals', action.__id).pipe(
        mergeMap(() => merge(
          of(new RemoveWeekGoalSuccess(action.__id, action.correlationId)),
          this.actionsOnRemove(action)
        )),
        catchError((error) => of(new RemoveWeekGoalFail(error, action.correlationId)))
      )
    })
  )

  actionsOnAdd(action: AddWeekGoal): Observable<Action> {
    return empty();
  }

  actionsOnUpdate(action: UpdateWeekGoal): Observable<Action> {
    return empty();
  }

  actionsOnRemove(action: RemoveWeekGoal): Observable<Action> {
    return empty();
  }

  constructor(
    private actions$: Actions, 
    private db: FirebaseService,
    private clc: CachedLoadConnectionsService
  ) {}
}