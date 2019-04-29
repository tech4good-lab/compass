import { Action } from '@ngrx/store';

export enum LoadingStateActionTypes {
  LOAD_DATA = '[Loading] load data',
  UPDATE_STATE  = '[Loading] update state',
  CLEANUP = '[Loading] cleanup'
}

/** Action for loading required DB data. */
export class LoadData implements Action {
  readonly type = LoadingStateActionTypes.LOAD_DATA;

  constructor() { }
}

/** Action for updating local state. */
export class UpdateState implements Action {
  readonly type = LoadingStateActionTypes.UPDATE_STATE;
  constructor(
    public stateVar: string,
    public newVal: any
  ) { }
}

/** Action for cleaning up loading subscriptions. */
export class Cleanup implements Action {
  readonly type = LoadingStateActionTypes.CLEANUP;
  constructor() { }
}

export type LoadingStateActions =
  LoadData |
  UpdateState |
  Cleanup;