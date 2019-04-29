import { Action } from '@ngrx/store';

export enum NavbarStateActionTypes {
  LOAD_DATA = '[Navbar] load data',
  UPDATE_STATE  = '[Navbar] update state',
  CLEANUP = '[Navbar] cleanup'
}

/** Action for loading required DB data. */
export class LoadData implements Action {
  readonly type = NavbarStateActionTypes.LOAD_DATA;

  constructor() { }
}

/** Action for updating local state. */
export class UpdateState implements Action {
  readonly type = NavbarStateActionTypes.UPDATE_STATE;
  constructor(
    public stateVar: string,
    public newVal: any
  ) { }
}

/** Action for cleaning up loading subscriptions. */
export class Cleanup implements Action {
  readonly type = NavbarStateActionTypes.CLEANUP;
  constructor() { }
}

export type NavbarStateActions =
  LoadData |
  UpdateState |
  Cleanup;