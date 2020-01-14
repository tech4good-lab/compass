import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of, Observable, throwError, forkJoin, from, pipe, merge } from 'rxjs';
import { switchMap, flatMap, mergeMap, map, catchError, tap, take } from 'rxjs/operators';
import { FirebaseService } from '../../firebase/firebase.service';
import { CachedLoadConnectionsService } from '../cached-load-connections.service';

import { Hashtag } from './hashtag.model';
import { HashtagActionTypes, HashtagActions,
  LoadHashtag, LoadHashtagSuccess, LoadHashtagFail,
  AddHashtag, AddHashtagSuccess, AddHashtagFail,
  UpdateHashtag, UpdateHashtagSuccess, UpdateHashtagFail,
  UpsertHashtag, UpsertHashtagSuccess, UpsertHashtagFail,
  RemoveHashtag, RemoveHashtagSuccess, RemoveHashtagFail } from './hashtag.actions';

@Injectable()
export class HashtagEffects {

  /** Process the load action to create firebase connections. */
  load$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<LoadHashtag>(HashtagActionTypes.LOAD),
      mergeMap((action: LoadHashtag) => {
        const connection = this.clc.processLoadAction(action);
        return connection.loadStream.pipe(
          take(1),
          map(() => new LoadHashtagSuccess(action.queryParams, action.queryOptions, action.correlationId, action.followupActions)),
          catchError((error) => of(new LoadHashtagFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the add action to update database and initiate callbacks. */
  add$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<AddHashtag>(HashtagActionTypes.ADD),
      mergeMap((action: AddHashtag) => {
        return this.db.addEntity('hashtags', action.hashtag).pipe(
          mergeMap(() => merge(
            of(new AddHashtagSuccess(action.hashtag, action.correlationId)),
            this.actionsOnAdd(action),
          )),
          catchError((error) => of(new AddHashtagFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the update action to update database and initiate callbacks. */
  update$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<UpdateHashtag>(HashtagActionTypes.UPDATE),
      mergeMap((action: UpdateHashtag) => {
        return this.db.updateEntity('hashtags', action.__id, action.changes).pipe(
          mergeMap(() => merge(
            of(new UpdateHashtagSuccess(action.__id, action.changes, action.correlationId)),
            this.actionsOnUpdate(action),
          )),
          catchError((error) => of(new UpdateHashtagFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the upsert action to update database and initiate callbacks. */
  upsert$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<UpsertHashtag>(HashtagActionTypes.UPSERT),
      mergeMap((action: UpsertHashtag) => {
        return this.db.upsertEntity('hashtags', action.hashtag).pipe(
          mergeMap((results) => merge(
            of(new UpsertHashtagSuccess(action.hashtag, action.correlationId)),
            results.type === 'add' ? this.actionsOnAdd(new AddHashtag(action.hashtag, action.correlationId)) : this.actionsOnUpdate(new UpdateHashtag(action.hashtag.__id, action.hashtag, action.correlationId)),
          )),
          catchError((error) => of(new UpsertHashtagFail(error, action.correlationId))),
        );
      }),
    ),
  );

  /** Process the remove action to update database and initiate callbacks. */
  remove$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<RemoveHashtag>(HashtagActionTypes.REMOVE),
      mergeMap((action: RemoveHashtag) => {
        return this.db.removeEntity('hashtags', action.__id).pipe(
          mergeMap(() => merge(
            of(new RemoveHashtagSuccess(action.__id, action.correlationId)),
            this.actionsOnRemove(action),
          )),
          catchError((error) => of(new RemoveHashtagFail(error, action.correlationId))),
        );
      }),
    ),
  );

  actionsOnAdd(action: AddHashtag): Observable<Action> {
    return EMPTY;
  }

  actionsOnUpdate(action: UpdateHashtag): Observable<Action> {
    return EMPTY;
  }

  actionsOnRemove(action: RemoveHashtag): Observable<Action> {
    return EMPTY;
  }

  constructor(
    private actions$: Actions,
    private db: FirebaseService,
    private clc: CachedLoadConnectionsService,
  ) {}
}
