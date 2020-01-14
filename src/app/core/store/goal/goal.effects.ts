import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of, Observable, throwError, forkJoin, from, pipe, merge } from 'rxjs';
import { switchMap, flatMap, mergeMap, map, catchError, tap, take } from 'rxjs/operators';
import { FirebaseService } from '../../firebase/firebase.service';
import { CachedLoadConnectionsService } from '../cached-load-connections.service';

import { Goal } from './goal.model';
import { GoalActionTypes, GoalActions,
  LoadGoal, LoadGoalSuccess, LoadGoalFail,
  AddGoal, AddGoalSuccess, AddGoalFail,
  UpdateGoal, UpdateGoalSuccess, UpdateGoalFail,
  UpsertGoal, UpsertGoalSuccess, UpsertGoalFail,
  RemoveGoal, RemoveGoalSuccess, RemoveGoalFail } from './goal.actions';

@Injectable()
export class GoalEffects {

  /** Process the load action to create firebase connections. */
  load$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<LoadGoal>(GoalActionTypes.LOAD),
      mergeMap((action: LoadGoal) => {
        const connection = this.clc.processLoadAction(action);
        return connection.loadStream.pipe(
          take(1),
          map(() => new LoadGoalSuccess(action.queryParams, action.queryOptions, action.correlationId, action.followupActions)),
          catchError((error) => of(new LoadGoalFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the add action to update database and initiate callbacks. */
  add$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<AddGoal>(GoalActionTypes.ADD),
      mergeMap((action: AddGoal) => {
        return this.db.addEntity('goals', action.goal).pipe(
          mergeMap(() => merge(
            of(new AddGoalSuccess(action.goal, action.correlationId)),
            this.actionsOnAdd(action),
          )),
          catchError((error) => of(new AddGoalFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the update action to update database and initiate callbacks. */
  update$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<UpdateGoal>(GoalActionTypes.UPDATE),
      mergeMap((action: UpdateGoal) => {
        return this.db.updateEntity('goals', action.__id, action.changes).pipe(
          mergeMap(() => merge(
            of(new UpdateGoalSuccess(action.__id, action.changes, action.correlationId)),
            this.actionsOnUpdate(action),
          )),
          catchError((error) => of(new UpdateGoalFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the upsert action to update database and initiate callbacks. */
  upsert$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<UpsertGoal>(GoalActionTypes.UPSERT),
      mergeMap((action: UpsertGoal) => {
        return this.db.upsertEntity('goals', action.goal).pipe(
          mergeMap((results) => merge(
            of(new UpsertGoalSuccess(action.goal, action.correlationId)),
            results.type === 'add' ? this.actionsOnAdd(new AddGoal(action.goal, action.correlationId)) : this.actionsOnUpdate(new UpdateGoal(action.goal.__id, action.goal, action.correlationId)),
          )),
          catchError((error) => of(new UpsertGoalFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the remove action to update database and initiate callbacks. */
  remove$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<RemoveGoal>(GoalActionTypes.REMOVE),
      mergeMap((action: RemoveGoal) => {
        return this.db.removeEntity('goals', action.__id).pipe(
          mergeMap(() => merge(
            of(new RemoveGoalSuccess(action.__id, action.correlationId)),
            this.actionsOnRemove(action),
          )),
          catchError((error) => of(new RemoveGoalFail(error, action.correlationId))),
        );
      }),
    ),
  );

  actionsOnAdd(action: AddGoal): Observable<Action> {
    return EMPTY;
  }

  actionsOnUpdate(action: UpdateGoal): Observable<Action> {
    return EMPTY;
  }

  actionsOnRemove(action: RemoveGoal): Observable<Action> {
    return EMPTY;
  }

  constructor(
    private actions$: Actions,
    private db: FirebaseService,
    private clc: CachedLoadConnectionsService,
  ) {}
}
