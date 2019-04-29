import { Action } from '@ngrx/store';
import { LoadAction } from '../app.actions';
import { WeekGoal } from './week-goal.model';

export enum WeekGoalActionTypes {
  LOAD = '[WeekGoal] load weekGoal',
  LOAD_SUCCESS = '[WeekGoal] load weekGoal success',
  LOAD_FAIL = '[WeekGoal] load weekGoal fail',
  ADD = '[WeekGoal] add weekGoal',
  ADD_SUCCESS = '[WeekGoal] add weekGoal success',
  ADD_FAIL = '[WeekGoal] add weekGoal fail',
  UPDATE = '[WeekGoal] update weekGoal',
  UPDATE_SUCCESS = '[WeekGoal] update weekGoal success',
  UPDATE_FAIL = '[WeekGoal] update weekGoal fail',
  UPSERT = '[WeekGoal] upsert weekGoal',
  UPSERT_SUCCESS = '[WeekGoal] upsert weekGoal success',
  UPSERT_FAIL = '[WeekGoal] upsert weekGoal fail',
  REMOVE = '[WeekGoal] remove weekGoal',
  REMOVE_SUCCESS = '[WeekGoal] remove weekGoal success',
  REMOVE_FAIL = '[WeekGoal] remove weekGoal fail',
  LOADED = '[WeekGoal] loaded',
  ADDED = '[WeekGoal] added',
  MODIFIED = '[WeekGoal] modified',
  REMOVED  = '[WeekGoal] removed'
}

// See Firebase Docs for current constraints on valid queries
export class LoadWeekGoal implements Action {
  readonly type = WeekGoalActionTypes.LOAD;
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
    public followupActions?: (weekGoal: WeekGoal) => LoadAction[]
  ) {}
}

export class LoadWeekGoalSuccess implements Action {
  readonly type = WeekGoalActionTypes.LOAD_SUCCESS;
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
    public followupActions?: (weekGoal: WeekGoal) => LoadAction[]
  ) {}
}

export class LoadWeekGoalFail implements Action {
  readonly type = WeekGoalActionTypes.LOAD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class AddWeekGoal implements Action {
  readonly type = WeekGoalActionTypes.ADD;
  constructor(
    public weekGoal: WeekGoal,
    public correlationId?: string
  ) {}
}

export class AddWeekGoalSuccess implements Action {
  readonly type = WeekGoalActionTypes.ADD_SUCCESS;
  constructor(
    public weekGoal: WeekGoal,
    public correlationId?: string
  ) {}
}

export class AddWeekGoalFail implements Action {
  readonly type = WeekGoalActionTypes.ADD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class UpdateWeekGoal implements Action {
  readonly type = WeekGoalActionTypes.UPDATE;
  constructor(
    public __id: string,
    public changes: Partial<WeekGoal>,
    public correlationId?: string
  ) { }
}

export class UpdateWeekGoalSuccess implements Action {
  readonly type = WeekGoalActionTypes.UPDATE_SUCCESS;
  constructor(
    public __id: string,
    public changes: Partial<WeekGoal>,
    public correlationId?: string
  ) {}
}

export class UpdateWeekGoalFail implements Action {
  readonly type = WeekGoalActionTypes.UPDATE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class UpsertWeekGoal implements Action {
  readonly type = WeekGoalActionTypes.UPSERT;
  constructor(
    public weekGoal: WeekGoal,
    public correlationId?: string
  ) {}
}

export class UpsertWeekGoalSuccess implements Action {
  readonly type = WeekGoalActionTypes.UPSERT_SUCCESS;
  constructor(
    public weekGoal: WeekGoal,
    public correlationId?: string
  ) {}
}

export class UpsertWeekGoalFail implements Action {
  readonly type = WeekGoalActionTypes.UPSERT_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class RemoveWeekGoal implements Action {
  readonly type = WeekGoalActionTypes.REMOVE;
  constructor(
    public __id: string,
    public correlationId?: string
  ) { }
}

export class RemoveWeekGoalSuccess implements Action {
  readonly type = WeekGoalActionTypes.REMOVE_SUCCESS;
  constructor(
    public __id: string,
    public correlationId?: string
  ) {}
}

export class RemoveWeekGoalFail implements Action {
  readonly type = WeekGoalActionTypes.REMOVE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class LoadedWeekGoal implements Action {
  readonly type = WeekGoalActionTypes.LOADED;
  constructor(
    public payload: WeekGoal[],
    public correlationId?: string
  ) {}
}

export class AddedWeekGoal implements Action {
  readonly type = WeekGoalActionTypes.ADDED;
  constructor(
    public payload: WeekGoal,
    public correlationId?: string
  ) {}
}

export class ModifiedWeekGoal implements Action {
  readonly type = WeekGoalActionTypes.MODIFIED;
  constructor(
    public payload: WeekGoal,
    public correlationId?: string
  ) {}
}

export class RemovedWeekGoal implements Action {
  readonly type = WeekGoalActionTypes.REMOVED;
  constructor(
    public payload: WeekGoal,
    public correlationId?: string
  ) {}
}

export type WeekGoalActions =
  LoadWeekGoal |
  LoadWeekGoalSuccess |
  LoadWeekGoalFail |
  AddWeekGoal |
  AddWeekGoalSuccess |
  AddWeekGoalFail |
  UpdateWeekGoal |
  UpdateWeekGoalSuccess |
  UpdateWeekGoalFail |
  UpsertWeekGoal |
  UpsertWeekGoalSuccess |
  UpsertWeekGoalFail |
  RemoveWeekGoal |
  RemoveWeekGoalSuccess |
  RemoveWeekGoalFail |
  LoadedWeekGoal |
  AddedWeekGoal |
  ModifiedWeekGoal |
  RemovedWeekGoal;