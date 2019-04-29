import { Action } from '@ngrx/store';
import { ObservableInput } from 'rxjs';
import { NavigationExtras } from '@angular/router';

export interface SAction extends Action {
  payload: { [index: string]: any; };
  correlationId?: string;
}

export interface LoadAction extends Action {
  queryParams: [string, string, any][];
  queryOptions: {
    orderBy?: string | [string, string],
    limit?: number,
    startAt?: string,
    startAfter?: string,
    endAt?: string
    endBefore?: string
  };
  correlationId: string;
  followupActions?: (entity: any) => LoadAction[];
}

export enum GeneralActionTypes {
  UNSUBSCRIBE = '[General] unsubscribe',
  ROUTER_NAVIGATE = '[Router] navigate',
  ACTION_FLOW = '[General] action flow'
}

/**
 * An action that helps orchestrate a flow of actions
 * @param actionTuples the group of actions to dispatch. Each tuple represents an action, the success action type, and the fail action type.
 * @param successActionFn a function executed if all actions are successful, and that returns an array of new actions to dispatch
 * @param failActionFn a function executed if any of the actions fail, and that returns an array of new actions to dispatch
 */
export class ActionFlow implements Action {
  readonly type = GeneralActionTypes.ACTION_FLOW;
  constructor(
    public actionTuples: [Action, string, string][],
    public successActionFn?: (actions: Action[], responseActions: Action[]) => ObservableInput<Action>,
    public failActionFn?: (actions: Action[], responseActions: Action[]) => ObservableInput<Action>
  ) {}
}

export class Unsubscribe implements Action {
  readonly type = GeneralActionTypes.UNSUBSCRIBE;
  constructor(
    public correlationId?: string
  ) {}
}

export class RouterNavigate implements Action {
  readonly type = GeneralActionTypes.ROUTER_NAVIGATE;
  constructor(
    public commands: any[],
    public extras?: NavigationExtras
  ) {}
}

export type GeneralActions =
  Unsubscribe |
  ActionFlow |
  RouterNavigate;