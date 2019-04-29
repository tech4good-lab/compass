import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { empty, of, Observable, throwError, forkJoin, from, pipe, merge } from 'rxjs';
import { switchMap, flatMap, mergeMap, map, catchError, tap, take } from 'rxjs/operators';
import { FirebaseService } from '../../firebase/firebase.service';
import { CachedLoadConnectionsService } from '../cached-load-connections.service';

import { QuarterGoal } from './quarter-goal.model';
import { QuarterGoalActionTypes, QuarterGoalActions,
  LoadQuarterGoal, LoadQuarterGoalSuccess, LoadQuarterGoalFail, 
  AddQuarterGoal, AddQuarterGoalSuccess, AddQuarterGoalFail,
  UpdateQuarterGoal, UpdateQuarterGoalSuccess, UpdateQuarterGoalFail,
  UpsertQuarterGoal, UpsertQuarterGoalSuccess, UpsertQuarterGoalFail,
  RemoveQuarterGoal, RemoveQuarterGoalSuccess, RemoveQuarterGoalFail } from './quarter-goal.actions';

/** QuarterGoal Effects */
@Injectable()
export class QuarterGoalEffects {

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<LoadQuarterGoal>(QuarterGoalActionTypes.LOAD),
    mergeMap((action: LoadQuarterGoal) => {
      const connection = this.clc.processLoadAction(action);
      return connection.loadStream.pipe(
        take(1),
        map(() => new LoadQuarterGoalSuccess(action.queryParams, action.queryOptions, action.correlationId, action.followupActions)),
        catchError((error) => of(new LoadQuarterGoalFail(error, action.correlationId)))
      )
    })
  );

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType<AddQuarterGoal>(QuarterGoalActionTypes.ADD),
    mergeMap((action: AddQuarterGoal) => {
      return this.db.addEntity('quarterGoals', action.quarterGoal).pipe(
        mergeMap(() => merge(
          of(new AddQuarterGoalSuccess(action.quarterGoal, action.correlationId)),
          this.actionsOnAdd(action)
        )),
        catchError((error) => of(new AddQuarterGoalFail(error, action.correlationId)))
      );
    })
  )

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateQuarterGoal>(QuarterGoalActionTypes.UPDATE),
    mergeMap((action: UpdateQuarterGoal) => {
      return this.db.updateEntity('quarterGoals', action.__id, action.changes).pipe(
        mergeMap(() => merge(
          of(new UpdateQuarterGoalSuccess(action.__id, action.changes, action.correlationId)),
          this.actionsOnUpdate(action)
        )),
        catchError((error) => of(new UpdateQuarterGoalFail(error, action.correlationId)))
      )
    })
  )

  @Effect()
  upsert$: Observable<Action> = this.actions$.pipe(
    ofType<UpsertQuarterGoal>(QuarterGoalActionTypes.UPSERT),
    mergeMap((action: UpsertQuarterGoal) => {
      return this.db.upsertEntity('quarterGoals', action.quarterGoal).pipe(
        mergeMap((results) => merge(
          of(new UpsertQuarterGoalSuccess(action.quarterGoal, action.correlationId)),
          results.type === 'add' ? this.actionsOnAdd(new AddQuarterGoal(action.quarterGoal, action.correlationId)) : this.actionsOnUpdate(new UpdateQuarterGoal(action.quarterGoal.__id, action.quarterGoal, action.correlationId))
        )),
        catchError((error) => of(new UpsertQuarterGoalFail(error, action.correlationId)))
      );
    })
  )

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveQuarterGoal>(QuarterGoalActionTypes.REMOVE),
    mergeMap((action: RemoveQuarterGoal) => {
      return this.db.removeEntity('quarterGoals', action.__id).pipe(
        mergeMap(() => merge(
          of(new RemoveQuarterGoalSuccess(action.__id, action.correlationId)),
          this.actionsOnRemove(action)
        )),
        catchError((error) => of(new RemoveQuarterGoalFail(error, action.correlationId)))
      )
    })
  )

  actionsOnAdd(action: AddQuarterGoal): Observable<Action> {
    return empty();
  }

  actionsOnUpdate(action: UpdateQuarterGoal): Observable<Action> {
    return empty();
  }

  actionsOnRemove(action: RemoveQuarterGoal): Observable<Action> {
    return empty();
  }

  constructor(
    private actions$: Actions, 
    private db: FirebaseService,
    private clc: CachedLoadConnectionsService
  ) {}
}