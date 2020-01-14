import { Action } from '@ngrx/store';

export enum OnboardingActionTypes {
  LOAD_DATA = '[Onboarding] load data',
  CLEANUP = '[Onboarding] cleanup',
}

/** Action for loading required DB data. */
export class LoadData implements Action {
  readonly type = OnboardingActionTypes.LOAD_DATA;

  constructor() { }
}

/** Action for cleaning up loading subscriptions. */
export class Cleanup implements Action {
  readonly type = OnboardingActionTypes.CLEANUP;
  constructor() { }
}

export type OnboardingActions =
  LoadData |
  Cleanup;
