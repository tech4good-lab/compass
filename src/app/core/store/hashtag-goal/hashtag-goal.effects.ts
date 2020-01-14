import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of, Observable, throwError, forkJoin, from, pipe, merge } from 'rxjs';
import { switchMap, flatMap, mergeMap, map, catchError, tap, take } from 'rxjs/operators';
import { FirebaseService } from '../../firebase/firebase.service';
import { CachedLoadConnectionsService } from '../cached-load-connections.service';

import { HashtagGoal } from './hashtag-goal.model';
import { HashtagGoalActionTypes, HashtagGoalActions,
  LoadHashtagGoal, LoadHashtagGoalSuccess, LoadHashtagGoalFail,
  AddHashtagGoal, AddHashtagGoalSuccess, AddHashtagGoalFail,
  UpdateHashtagGoal, UpdateHashtagGoalSuccess, UpdateHashtagGoalFail,
  UpsertHashtagGoal, UpsertHashtagGoalSuccess, UpsertHashtagGoalFail,
  RemoveHashtagGoal, RemoveHashtagGoalSuccess, RemoveHashtagGoalFail } from './hashtag-goal.actions';

@Injectable()
export class HashtagGoalEffects {

  /** Process the load action to create firebase connections. */
  load$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<LoadHashtagGoal>(HashtagGoalActionTypes.LOAD),
      mergeMap((action: LoadHashtagGoal) => {
        const connection = this.clc.processLoadAction(action);
        return connection.loadStream.pipe(
          take(1),
          map(() => new LoadHashtagGoalSuccess(action.queryParams, action.queryOptions, action.correlationId, action.followupActions)),
          catchError((error) => of(new LoadHashtagGoalFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the add action to update database and initiate callbacks. */
  add$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<AddHashtagGoal>(HashtagGoalActionTypes.ADD),
      mergeMap((action: AddHashtagGoal) => {
        return this.db.addEntity('hashtagGoals', action.hashtagGoal).pipe(
          mergeMap(() => merge(
            of(new AddHashtagGoalSuccess(action.hashtagGoal, action.correlationId)),
            this.actionsOnAdd(action),
          )),
          catchError((error) => of(new AddHashtagGoalFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the update action to update database and initiate callbacks. */
  update$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<UpdateHashtagGoal>(HashtagGoalActionTypes.UPDATE),
      mergeMap((action: UpdateHashtagGoal) => {
        return this.db.updateEntity('hashtagGoals', action.__id, action.changes).pipe(
          mergeMap(() => merge(
            of(new UpdateHashtagGoalSuccess(action.__id, action.changes, action.correlationId)),
            this.actionsOnUpdate(action),
          )),
          catchError((error) => of(new UpdateHashtagGoalFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the upsert action to update database and initiate callbacks. */
  upsert$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<UpsertHashtagGoal>(HashtagGoalActionTypes.UPSERT),
      mergeMap((action: UpsertHashtagGoal) => {
        return this.db.upsertEntity('hashtagGoals', action.hashtagGoal).pipe(
          mergeMap((results) => merge(
            of(new UpsertHashtagGoalSuccess(action.hashtagGoal, action.correlationId)),
            results.type === 'add' ? this.actionsOnAdd(new AddHashtagGoal(action.hashtagGoal, action.correlationId)) : this.actionsOnUpdate(new UpdateHashtagGoal(action.hashtagGoal.__id, action.hashtagGoal, action.correlationId)),
          )),
          catchError((error) => of(new UpsertHashtagGoalFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the remove action to update database and initiate callbacks. */
  remove$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<RemoveHashtagGoal>(HashtagGoalActionTypes.REMOVE),
      mergeMap((action: RemoveHashtagGoal) => {
        return this.db.removeEntity('hashtagGoals', action.__id).pipe(
          mergeMap(() => merge(
            of(new RemoveHashtagGoalSuccess(action.__id, action.correlationId)),
            this.actionsOnRemove(action),
          )),
          catchError((error) => of(new RemoveHashtagGoalFail(error, action.correlationId))),
        );
      }),
    ),
  );

  actionsOnAdd(action: AddHashtagGoal): Observable<Action> {
    return EMPTY;
  }

  actionsOnUpdate(action: UpdateHashtagGoal): Observable<Action> {
    return EMPTY;
  }

  actionsOnRemove(action: RemoveHashtagGoal): Observable<Action> {
    return EMPTY;
  }

  constructor(
    private actions$: Actions,
    private db: FirebaseService,
    private clc: CachedLoadConnectionsService,
  ) {}
}
