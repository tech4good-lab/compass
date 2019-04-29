import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, throwError, forkJoin, from, merge, empty } from 'rxjs';
import { switchMap, flatMap, mergeMap, map, catchError, tap, take } from 'rxjs/operators';
import { FirebaseService } from '../../firebase/firebase.service';
import { CachedLoadConnectionsService } from '../cached-load-connections.service';

import { User } from './user.model';
import { UserActionTypes, UserActions,
  LoadUser, LoadUserSuccess, LoadUserFail, 
  AddUser, AddUserSuccess, AddUserFail,
  UpdateUser, UpdateUserSuccess, UpdateUserFail,
  UpsertUser, UpsertUserSuccess, UpsertUserFail,
  RemoveUser, RemoveUserSuccess, RemoveUserFail } from './user.actions';

/* User Effects */
@Injectable()
export class UserEffects {

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.LOAD),
    mergeMap((action: LoadUser) => {
      const connection = this.clc.processLoadAction(action);
      return connection.loadStream.pipe(
        take(1),
        map(() => new LoadUserSuccess(action.queryParams, action.queryOptions, action.correlationId, action.followupActions)),
        catchError((error) => of(new LoadUserFail(error, action.correlationId)))
      )
    })
  );

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.ADD),
    mergeMap((action: AddUser) => {
      return this.db.addEntity('users', action.user).pipe(
        mergeMap(() => merge(
          of(new AddUserSuccess(action.user, action.correlationId)),
          this.actionsOnAdd(action)
        )),
        catchError((error) => of(new AddUserFail(error, action.correlationId)))
      );
    })
  )

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.UPDATE),
    mergeMap((action: UpdateUser) => {
      return this.db.updateEntity('users', action.__id, action.changes).pipe(
        mergeMap(() => merge(
          of(new UpdateUserSuccess(action.__id, action.changes, action.correlationId)),
          this.actionsOnUpdate(action)
        )),
        catchError((error) => of(new UpdateUserFail(error, action.correlationId)))
      )
    })
  )

  @Effect()
  upsert$: Observable<Action> = this.actions$.pipe(
    ofType<UpsertUser>(UserActionTypes.UPSERT),
    mergeMap((action: UpsertUser) => {
      return this.db.upsertEntity('users', action.user).pipe(
        mergeMap((results) => merge(
          of(new UpsertUserSuccess(action.user, action.correlationId)),
          results.type === 'add' ? this.actionsOnAdd(new AddUser(action.user, action.correlationId)) : this.actionsOnUpdate(new UpdateUser(action.user.__id, action.user, action.correlationId))

        )),
        catchError((error) => of(new UpsertUserFail(error, action.correlationId)))
      );
    })
  )

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.REMOVE),
    mergeMap((action: RemoveUser) => {
      return this.db.removeEntity('users', action.__id).pipe(
        mergeMap(() => merge(
          of(new RemoveUserSuccess(action.__id, action.correlationId)),
          this.actionsOnRemove(action)
        )),
        catchError((error) => of(new RemoveUserFail(error, action.correlationId)))
      )
    })
  )
  
  actionsOnAdd(action: AddUser): Observable<Action> {
    return empty();
  }

  actionsOnUpdate(action: UpdateUser): Observable<Action> {
    return empty();
  }

  actionsOnRemove(action: RemoveUser): Observable<Action> {
    return empty();
  }

  constructor(
    private actions$: Actions, 
    private db: FirebaseService, 
    private clc: CachedLoadConnectionsService
  ) {}
}