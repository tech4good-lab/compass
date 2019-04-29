import { Action } from '@ngrx/store';

export enum CompletedStateActionTypes {
  LOAD_DATA = '[Completed] load data',
  UPDATE_STATE  = '[Completed] update state',
  CLEANUP = '[Completed] cleanup'
}

/** Action for loading required DB data. */
export class LoadData implements Action {
  readonly type = CompletedStateActionTypes.LOAD_DATA;

  constructor() { }
}

/** Action for updating local state. */
export class UpdateState implements Action {
  readonly type = CompletedStateActionTypes.UPDATE_STATE;
  constructor(
    public stateVar: string,
    public newVal: any
  ) { }
}

/** Action for cleaning up loading subscriptions. */
export class Cleanup implements Action {
  readonly type = CompletedStateActionTypes.CLEANUP;
  constructor() { }
}

export type CompletedStateActions =
  LoadData |
  UpdateState |
  Cleanup;