import { Action } from '@ngrx/store';

export enum ReorientStateActionTypes {
  LOAD_DATA = '[Reorient] load data',
  UPDATE_STATE  = '[Reorient] update state',
  CLEANUP = '[Reorient] cleanup'
}

/** Action for loading required DB data. */
export class LoadData implements Action {
  readonly type = ReorientStateActionTypes.LOAD_DATA;

  constructor() { }
}

/** Action for updating local state. */
export class UpdateState implements Action {
  readonly type = ReorientStateActionTypes.UPDATE_STATE;
  constructor(
    public stateVar: string,
    public newVal: any
  ) { }
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