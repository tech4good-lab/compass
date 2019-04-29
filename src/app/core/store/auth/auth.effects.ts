import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../app.reducer';
import * as fromAuth from './auth.reducer';
import { FirebaseService } from '../../firebase/firebase.service';
import { ActionFlow, RouterNavigate } from '../app.actions';
import * as firebase from 'firebase/app';

import { switchMap, mergeMap, map, catchError, tap, take, pluck } from 'rxjs/operators';
import { LOAD, LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL, Login, LoginSuccess, LoginFail, Logout, LogoutSuccess, LogoutFail, LoadAuth, LoadedAuth } from './auth.actions';
import { User } from '../user/user.model';
import { UserActionTypes, AddUser, UpdateUser } from '../user/user.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  Logout$: Observable<Action> = this.actions$.pipe(
    ofType(LOGOUT),
    mergeMap((action: Logout) => {
      return this.db.logout().pipe(
        mergeMap(() => [
          new LoadAuth(), 
          new LogoutSuccess(action.correlationId),
          new RouterNavigate(['/login'])
        ]),
        catchError((error) => of(new LogoutFail(error, action.correlationId)))
      );
    })
  );

  @Effect()
  LoadAuth$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAuth>(LOAD),
    switchMap(() => this.db.afUser().pipe(take(1))),
    mergeMap((afUser: any) => {
      if (afUser) {
        return this.db.queryObjValueChanges<User>('users', afUser.uid).pipe(
          map((user: User) => {

            if (user) {
              return new LoadedAuth({ user });
            } else {
              // If no entry in DB, make them login again to create an entry
              return new Logout();
            }
          })
        );
      } else {
        return [new LoadedAuth({ user: undefined })];
      }
    })
  );

  @Effect()
  Login$: Observable<Action> = this.actions$.pipe(
    ofType<Login>(LOGIN),
    switchMap(action => {
      return this.db.login(action.payload.provider, action.payload.scope).pipe(
        map(results => {
          let afUser = results.user;
          let dbUser = results.dbUser;

          let userActionTuple;

          const userParams = {
            email: afUser.email,
            name: afUser.displayName || afUser.email,
            photoURL: afUser.photoURL
          };

          if (dbUser) {
            // update user
            userActionTuple = [new UpdateUser(dbUser.__id, Object.assign({}, userParams, {
              tokens: Object.assign({}, dbUser.tokens || {}, this.getToken(results.credential))
            })), UserActionTypes.UPDATE_SUCCESS, UserActionTypes.UPDATE_FAIL];
          } else {
            // add user
            userActionTuple = [new AddUser(Object.assign({}, userParams, {
              __id: afUser.uid,
              tokens: this.getToken(results.credential),
            })), UserActionTypes.ADD_SUCCESS, UserActionTypes.ADD_FAIL];
          }

          return new ActionFlow(
            [userActionTuple],
            (actions, responses) => {
              return [
                new LoadAuth(),
                // Change this to where you want to navigate to after login
                new RouterNavigate(['/login']),
                new LoginSuccess({ ...action.payload, ...results }, action.correlationId)
              ];
            }
          );
        }),
        catchError(error => of(new LoginFail(error, action.correlationId)))
      );
    })
  );

  @Effect({ dispatch: false })
  loginFail$: Observable<Action> = this.actions$.pipe(
    ofType<LoginFail>(LOGIN_FAIL),
    tap((action: LoginFail) => {
      switch (action.error.code) {
        case 'auth/account-exists-with-different-credential': {
          this.db.loginLink(action.error);
        }
      }
    })
  );

  getToken(credential) {
   let tokenHash = {};
    tokenHash[credential.providerId] = credential.accessToken;

    return tokenHash;
  }
 
  constructor(private actions$: Actions, private store: Store<fromStore.State>, private router: Router, private db: FirebaseService) {}
}
