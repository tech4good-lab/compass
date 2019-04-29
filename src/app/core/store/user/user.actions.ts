import { Action } from '@ngrx/store';
import { User } from './user.model';
import { LoadAction } from '../app.actions';

export enum UserActionTypes {
  /* Actions for loading data from Firebase */
  LOAD = '[User] load user',
  LOAD_SUCCESS = '[User] load user success',
  LOAD_FAIL = '[User] load user fail',
  /* Actions for mutating data on Firebase */
  ADD = '[User] add user',
  ADD_SUCCESS = '[User] add user success',
  ADD_FAIL = '[User] add user fail',
  UPDATE = '[User] update user',
  UPDATE_SUCCESS = '[User] update user success',
  UPDATE_FAIL = '[User] update user fail',
  UPSERT = '[User] upsert user',
  UPSERT_SUCCESS = '[User] upsert user success',
  UPSERT_FAIL = '[User] upsert user fail',
  REMOVE = '[User] remove user',
  REMOVE_SUCCESS = '[User] remove user success',
  REMOVE_FAIL = '[User] remove user fail',
  /* Interface between Firebase StateChanges and NgRx */
  LOADED = '[User] loaded',
  ADDED = '[User] added',
  MODIFIED = '[User] modified',
  REMOVED  = '[User] removed'
}

/* See Firebase Docs for current constraints on valid queries */
export class LoadUser implements Action {
  readonly type = UserActionTypes.LOAD;
  constructor(
    // property, comparator, value
    public queryParams: [string, string, any][],
    public queryOptions: {
      orderBy?: string | [string, string],
      limit?: number,
      startAt?: string,
      startAfter?: string,
      endAt?: string
      endBefore?: string
    },
    public correlationId: string,
    public followupActions?: (user: User) => LoadAction[]
  ) {}
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LOAD_SUCCESS;
  constructor(
    public queryParams: [string, string, any][],
    public queryOptions: {
      orderBy?: string | [string, string],
      limit?: number,
      startAt?: string,
      startAfter?: string,
      endAt?: string
      endBefore?: string
    },
    public correlationId: string,
    public followupActions?: (user: User) => LoadAction[]
  ) {}
}

export class LoadUserFail implements Action {
  readonly type = UserActionTypes.LOAD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class AddUser implements Action {
  readonly type = UserActionTypes.ADD;
  constructor(
    public user: User,
    public correlationId?: string
  ) {}
}

export class AddUserSuccess implements Action {
  readonly type = UserActionTypes.ADD_SUCCESS;
  constructor(
    public user: User,
    public correlationId?: string
  ) {}
}

export class AddUserFail implements Action {
  readonly type = UserActionTypes.ADD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UPDATE;
  constructor(
    public __id: string,
    public changes: Partial<User>,
    public correlationId?: string
  ) { }
}

export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_SUCCESS;
  constructor(
    public __id: string,
    public changes: Partial<User>,
    public correlationId?: string
  ) {}
}

export class UpdateUserFail implements Action {
  readonly type = UserActionTypes.UPDATE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class UpsertUser implements Action {
  readonly type = UserActionTypes.UPSERT;
  constructor(
    public user: User,
    public correlationId?: string
  ) {}
}

export class UpsertUserSuccess implements Action {
  readonly type = UserActionTypes.UPSERT_SUCCESS;
  constructor(
    public user: User,
    public correlationId?: string
  ) {}
}

export class UpsertUserFail implements Action {
  readonly type = UserActionTypes.UPSERT_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class RemoveUser implements Action {
  readonly type = UserActionTypes.REMOVE;
  constructor(
    public __id: string,
    public correlationId?: string
  ) { }
}

export class RemoveUserSuccess implements Action {
  readonly type = UserActionTypes.REMOVE_SUCCESS;
  constructor(
    public __id: string,
    public correlationId?: string
  ) {}
}

export class RemoveUserFail implements Action {
  readonly type = UserActionTypes.REMOVE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class LoadedUser implements Action {
  readonly type = UserActionTypes.LOADED;
  constructor(
    public payload: User[],
    public correlationId?: string
  ) {}
}

export class AddedUser implements Action {
  readonly type = UserActionTypes.ADDED;
  constructor(
    public payload: User,
    public correlationId?: string
  ) {}
}

export class ModifiedUser implements Action {
  readonly type = UserActionTypes.MODIFIED;
  constructor(
    public payload: User,
    public correlationId?: string
  ) {}
}

export class RemovedUser implements Action {
  readonly type = UserActionTypes.REMOVED;
  constructor(
    public payload: User,
    public correlationId?: string
  ) {}
}

export type UserActions =
  LoadUser |
  LoadUserSuccess |
  LoadUserFail |
  AddUser |
  AddUserSuccess |
  AddUserFail |
  UpdateUser |
  UpdateUserSuccess |
  UpdateUserFail |
  UpsertUser |
  UpsertUserSuccess |
  UpsertUserFail |
  RemoveUser |
  RemoveUserSuccess |
  RemoveUserFail |
  LoadedUser |
  AddedUser |
  ModifiedUser |
  RemovedUser;