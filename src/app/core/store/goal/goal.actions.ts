import { Action } from '@ngrx/store';
import { LoadAction } from '../app.actions';
import { Goal } from './goal.model';

export enum GoalActionTypes {
  LOAD = '[Goal] load goal',
  LOAD_SUCCESS = '[Goal] load goal success',
  LOAD_FAIL = '[Goal] load goal fail',
  ADD = '[Goal] add goal',
  ADD_SUCCESS = '[Goal] add goal success',
  ADD_FAIL = '[Goal] add goal fail',
  UPDATE = '[Goal] update goal',
  UPDATE_SUCCESS = '[Goal] update goal success',
  UPDATE_FAIL = '[Goal] update goal fail',
  UPSERT = '[Goal] upsert goal',
  UPSERT_SUCCESS = '[Goal] upsert goal success',
  UPSERT_FAIL = '[Goal] upsert goal fail',
  REMOVE = '[Goal] remove goal',
  REMOVE_SUCCESS = '[Goal] remove goal success',
  REMOVE_FAIL = '[Goal] remove goal fail',
  LOADED = '[Goal] loaded',
  ADDED = '[Goal] added',
  MODIFIED = '[Goal] modified',
  REMOVED  = '[Goal] removed',
}

// See Firebase Docs for current constraints on valid queries
export class LoadGoal implements Action {
  readonly type = GoalActionTypes.LOAD;
  constructor(
    // property, comparator, value
    public queryParams: [string, string, any][],
    public queryOptions: {
      orderBy?: string | [string, string],
      limit?: number,
      startAt?: string,
      startAfter?: string,
      endAt?: string,
      endBefore?: string,
    },
    public correlationId: string,
    public followupActions?: (goal: Goal) => LoadAction[],
  ) {}
}

export class LoadGoalSuccess implements Action {
  readonly type = GoalActionTypes.LOAD_SUCCESS;
  constructor(
    public queryParams: [string, string, any][],
    public queryOptions: {
      orderBy?: string | [string, string],
      limit?: number,
      startAt?: string,
      startAfter?: string,
      endAt?: string,
      endBefore?: string,
    },
    public correlationId: string,
    public followupActions?: (goal: Goal) => LoadAction[],
  ) {}
}

export class LoadGoalFail implements Action {
  readonly type = GoalActionTypes.LOAD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class AddGoal implements Action {
  readonly type = GoalActionTypes.ADD;
  constructor(
    public goal: Goal,
    public correlationId?: string,
  ) {}
}

export class AddGoalSuccess implements Action {
  readonly type = GoalActionTypes.ADD_SUCCESS;
  constructor(
    public goal: Goal,
    public correlationId?: string,
  ) {}
}

export class AddGoalFail implements Action {
  readonly type = GoalActionTypes.ADD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class UpdateGoal implements Action {
  readonly type = GoalActionTypes.UPDATE;
  constructor(
    public __id: string,
    public changes: Partial<Goal>,
    public correlationId?: string,
  ) { }
}

export class UpdateGoalSuccess implements Action {
  readonly type = GoalActionTypes.UPDATE_SUCCESS;
  constructor(
    public __id: string,
    public changes: Partial<Goal>,
    public correlationId?: string,
  ) {}
}

export class UpdateGoalFail implements Action {
  readonly type = GoalActionTypes.UPDATE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class UpsertGoal implements Action {
  readonly type = GoalActionTypes.UPSERT;
  constructor(
    public goal: Goal,
    public correlationId?: string,
  ) {}
}

export class UpsertGoalSuccess implements Action {
  readonly type = GoalActionTypes.UPSERT_SUCCESS;
  constructor(
    public goal: Goal,
    public correlationId?: string,
  ) {}
}

export class UpsertGoalFail implements Action {
  readonly type = GoalActionTypes.UPSERT_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class RemoveGoal implements Action {
  readonly type = GoalActionTypes.REMOVE;
  constructor(
    public __id: string,
    public correlationId?: string,
  ) { }
}

export class RemoveGoalSuccess implements Action {
  readonly type = GoalActionTypes.REMOVE_SUCCESS;
  constructor(
    public __id: string,
    public correlationId?: string,
  ) {}
}

export class RemoveGoalFail implements Action {
  readonly type = GoalActionTypes.REMOVE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class LoadedGoal implements Action {
  readonly type = GoalActionTypes.LOADED;
  constructor(
    public payload: Goal[],
    public correlationId?: string,
  ) {}
}

export class AddedGoal implements Action {
  readonly type = GoalActionTypes.ADDED;
  constructor(
    public payload: Goal,
    public correlationId?: string,
  ) {}
}

export class ModifiedGoal implements Action {
  readonly type = GoalActionTypes.MODIFIED;
  constructor(
    public payload: Goal,
    public correlationId?: string,
  ) {}
}

export class RemovedGoal implements Action {
  readonly type = GoalActionTypes.REMOVED;
  constructor(
    public payload: Goal,
    public correlationId?: string,
  ) {}
}

export type GoalActions =
  LoadGoal |
  LoadGoalSuccess |
  LoadGoalFail |
  AddGoal |
  AddGoalSuccess |
  AddGoalFail |
  UpdateGoal |
  UpdateGoalSuccess |
  UpdateGoalFail |
  UpsertGoal |
  UpsertGoalSuccess |
  UpsertGoalFail |
  RemoveGoal |
  RemoveGoalSuccess |
  RemoveGoalFail |
  LoadedGoal |
  AddedGoal |
  ModifiedGoal |
  RemovedGoal;
