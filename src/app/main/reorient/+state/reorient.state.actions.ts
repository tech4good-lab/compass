import { Action } from '@ngrx/store';
import { User } from '../../../core/store/user/user.model'

export enum ReorientStateActionTypes {
  LOAD_DATA = '[Reorient] load data',
  UPDATE_STATE  = '[Reorient] update state',
  CLEANUP = '[Reorient] cleanup'
}

/** Action for loading required DB data. */
export class LoadData implements Action {
  readonly type = ReorientStateActionTypes.LOAD_DATA;
  constructor(public payload: {
    currentUser: User,
    startOfWeek: Date
  }) { }
}

/** Action for updating local state. */
export class UpdateState implements Action {
  readonly type = ReorientStateActionTypes.UPDATE_STATE;
  constructor(public payload: {
    stateVar: string,
    newVal: any
  }) { }
}

/** Action for cleaning up loading subscriptions. */
export class Cleanup implements Action {
  readonly type = ReorientStateActionTypes.CLEANUP;
  constructor() { }
}

export type ReorientStateActions =
  LoadData |
  UpdateState |
  Cleanup;