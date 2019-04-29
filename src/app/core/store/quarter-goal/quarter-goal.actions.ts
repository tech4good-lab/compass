import { Action } from '@ngrx/store';
import { LoadAction } from '../app.actions';
import { QuarterGoal } from './quarter-goal.model';

export enum QuarterGoalActionTypes {
  LOAD = '[QuarterGoal] load quarterGoal',
  LOAD_SUCCESS = '[QuarterGoal] load quarterGoal success',
  LOAD_FAIL = '[QuarterGoal] load quarterGoal fail',
  ADD = '[QuarterGoal] add quarterGoal',
  ADD_SUCCESS = '[QuarterGoal] add quarterGoal success',
  ADD_FAIL = '[QuarterGoal] add quarterGoal fail',
  UPDATE = '[QuarterGoal] update quarterGoal',
  UPDATE_SUCCESS = '[QuarterGoal] update quarterGoal success',
  UPDATE_FAIL = '[QuarterGoal] update quarterGoal fail',
  UPSERT = '[QuarterGoal] upsert quarterGoal',
  UPSERT_SUCCESS = '[QuarterGoal] upsert quarterGoal success',
  UPSERT_FAIL = '[QuarterGoal] upsert quarterGoal fail',
  REMOVE = '[QuarterGoal] remove quarterGoal',
  REMOVE_SUCCESS = '[QuarterGoal] remove quarterGoal success',
  REMOVE_FAIL = '[QuarterGoal] remove quarterGoal fail',
  LOADED = '[QuarterGoal] loaded',
  ADDED = '[QuarterGoal] added',
  MODIFIED = '[QuarterGoal] modified',
  REMOVED  = '[QuarterGoal] removed'
}

// See Firebase Docs for current constraints on valid queries
export class LoadQuarterGoal implements Action {
  readonly type = QuarterGoalActionTypes.LOAD;
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
    public followupActions?: (quarterGoal: QuarterGoal) => LoadAction[]
  ) {}
}

export class LoadQuarterGoalSuccess implements Action {
  readonly type = QuarterGoalActionTypes.LOAD_SUCCESS;
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
    public followupActions?: (quarterGoal: QuarterGoal) => LoadAction[]
  ) {}
}

export class LoadQuarterGoalFail implements Action {
  readonly type = QuarterGoalActionTypes.LOAD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class AddQuarterGoal implements Action {
  readonly type = QuarterGoalActionTypes.ADD;
  constructor(
    public quarterGoal: QuarterGoal,
    public correlationId?: string
  ) {}
}

export class AddQuarterGoalSuccess implements Action {
  readonly type = QuarterGoalActionTypes.ADD_SUCCESS;
  constructor(
    public quarterGoal: QuarterGoal,
    public correlationId?: string
  ) {}
}

export class AddQuarterGoalFail implements Action {
  readonly type = QuarterGoalActionTypes.ADD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class UpdateQuarterGoal implements Action {
  readonly type = QuarterGoalActionTypes.UPDATE;
  constructor(
    public __id: string,
    public changes: Partial<QuarterGoal>,
    public correlationId?: string
  ) { }
}

export class UpdateQuarterGoalSuccess implements Action {
  readonly type = QuarterGoalActionTypes.UPDATE_SUCCESS;
  constructor(
    public __id: string,
    public changes: Partial<QuarterGoal>,
    public correlationId?: string
  ) {}
}

export class UpdateQuarterGoalFail implements Action {
  readonly type = QuarterGoalActionTypes.UPDATE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class UpsertQuarterGoal implements Action {
  readonly type = QuarterGoalActionTypes.UPSERT;
  constructor(
    public quarterGoal: QuarterGoal,
    public correlationId?: string
  ) {}
}

export class UpsertQuarterGoalSuccess implements Action {
  readonly type = QuarterGoalActionTypes.UPSERT_SUCCESS;
  constructor(
    public quarterGoal: QuarterGoal,
    public correlationId?: string
  ) {}
}

export class UpsertQuarterGoalFail implements Action {
  readonly type = QuarterGoalActionTypes.UPSERT_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class RemoveQuarterGoal implements Action {
  readonly type = QuarterGoalActionTypes.REMOVE;
  constructor(
    public __id: string,
    public correlationId?: string
  ) { }
}

export class RemoveQuarterGoalSuccess implements Action {
  readonly type = QuarterGoalActionTypes.REMOVE_SUCCESS;
  constructor(
    public __id: string,
    public correlationId?: string
  ) {}
}

export class RemoveQuarterGoalFail implements Action {
  readonly type = QuarterGoalActionTypes.REMOVE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class LoadedQuarterGoal implements Action {
  readonly type = QuarterGoalActionTypes.LOADED;
  constructor(
    public payload: QuarterGoal[],
    public correlationId?: string
  ) {}
}

export class AddedQuarterGoal implements Action {
  readonly type = QuarterGoalActionTypes.ADDED;
  constructor(
    public payload: QuarterGoal,
    public correlationId?: string
  ) {}
}

export class ModifiedQuarterGoal implements Action {
  readonly type = QuarterGoalActionTypes.MODIFIED;
  constructor(
    public payload: QuarterGoal,
    public correlationId?: string
  ) {}
}

export class RemovedQuarterGoal implements Action {
  readonly type = QuarterGoalActionTypes.REMOVED;
  constructor(
    public payload: QuarterGoal,
    public correlationId?: string
  ) {}
}

export type QuarterGoalActions =
  LoadQuarterGoal |
  LoadQuarterGoalSuccess |
  LoadQuarterGoalFail |
  AddQuarterGoal |
  AddQuarterGoalSuccess |
  AddQuarterGoalFail |
  UpdateQuarterGoal |
  UpdateQuarterGoalSuccess |
  UpdateQuarterGoalFail |
  UpsertQuarterGoal |
  UpsertQuarterGoalSuccess |
  UpsertQuarterGoalFail |
  RemoveQuarterGoal |
  RemoveQuarterGoalSuccess |
  RemoveQuarterGoalFail |
  LoadedQuarterGoal |
  AddedQuarterGoal |
  ModifiedQuarterGoal |
  RemovedQuarterGoal;