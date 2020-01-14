import { Action } from '@ngrx/store';
import { LoadAction } from '../app.actions';
import { HashtagGoal } from './hashtag-goal.model';

export enum HashtagGoalActionTypes {
  LOAD = '[HashtagGoal] load hashtagGoal',
  LOAD_SUCCESS = '[HashtagGoal] load hashtagGoal success',
  LOAD_FAIL = '[HashtagGoal] load hashtagGoal fail',
  ADD = '[HashtagGoal] add hashtagGoal',
  ADD_SUCCESS = '[HashtagGoal] add hashtagGoal success',
  ADD_FAIL = '[HashtagGoal] add hashtagGoal fail',
  UPDATE = '[HashtagGoal] update hashtagGoal',
  UPDATE_SUCCESS = '[HashtagGoal] update hashtagGoal success',
  UPDATE_FAIL = '[HashtagGoal] update hashtagGoal fail',
  UPSERT = '[HashtagGoal] upsert hashtagGoal',
  UPSERT_SUCCESS = '[HashtagGoal] upsert hashtagGoal success',
  UPSERT_FAIL = '[HashtagGoal] upsert hashtagGoal fail',
  REMOVE = '[HashtagGoal] remove hashtagGoal',
  REMOVE_SUCCESS = '[HashtagGoal] remove hashtagGoal success',
  REMOVE_FAIL = '[HashtagGoal] remove hashtagGoal fail',
  LOADED = '[HashtagGoal] loaded',
  ADDED = '[HashtagGoal] added',
  MODIFIED = '[HashtagGoal] modified',
  REMOVED  = '[HashtagGoal] removed',
}

// See Firebase Docs for current constraints on valid queries
export class LoadHashtagGoal implements Action {
  readonly type = HashtagGoalActionTypes.LOAD;
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
    public followupActions?: (hashtagGoal: HashtagGoal) => LoadAction[],
  ) {}
}

export class LoadHashtagGoalSuccess implements Action {
  readonly type = HashtagGoalActionTypes.LOAD_SUCCESS;
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
    public followupActions?: (hashtagGoal: HashtagGoal) => LoadAction[],
  ) {}
}

export class LoadHashtagGoalFail implements Action {
  readonly type = HashtagGoalActionTypes.LOAD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class AddHashtagGoal implements Action {
  readonly type = HashtagGoalActionTypes.ADD;
  constructor(
    public hashtagGoal: HashtagGoal,
    public correlationId?: string,
  ) {}
}

export class AddHashtagGoalSuccess implements Action {
  readonly type = HashtagGoalActionTypes.ADD_SUCCESS;
  constructor(
    public hashtagGoal: HashtagGoal,
    public correlationId?: string,
  ) {}
}

export class AddHashtagGoalFail implements Action {
  readonly type = HashtagGoalActionTypes.ADD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class UpdateHashtagGoal implements Action {
  readonly type = HashtagGoalActionTypes.UPDATE;
  constructor(
    public __id: string,
    public changes: Partial<HashtagGoal>,
    public correlationId?: string,
  ) { }
}

export class UpdateHashtagGoalSuccess implements Action {
  readonly type = HashtagGoalActionTypes.UPDATE_SUCCESS;
  constructor(
    public __id: string,
    public changes: Partial<HashtagGoal>,
    public correlationId?: string,
  ) {}
}

export class UpdateHashtagGoalFail implements Action {
  readonly type = HashtagGoalActionTypes.UPDATE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class UpsertHashtagGoal implements Action {
  readonly type = HashtagGoalActionTypes.UPSERT;
  constructor(
    public hashtagGoal: HashtagGoal,
    public correlationId?: string,
  ) {}
}

export class UpsertHashtagGoalSuccess implements Action {
  readonly type = HashtagGoalActionTypes.UPSERT_SUCCESS;
  constructor(
    public hashtagGoal: HashtagGoal,
    public correlationId?: string,
  ) {}
}

export class UpsertHashtagGoalFail implements Action {
  readonly type = HashtagGoalActionTypes.UPSERT_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class RemoveHashtagGoal implements Action {
  readonly type = HashtagGoalActionTypes.REMOVE;
  constructor(
    public __id: string,
    public correlationId?: string,
  ) { }
}

export class RemoveHashtagGoalSuccess implements Action {
  readonly type = HashtagGoalActionTypes.REMOVE_SUCCESS;
  constructor(
    public __id: string,
    public correlationId?: string,
  ) {}
}

export class RemoveHashtagGoalFail implements Action {
  readonly type = HashtagGoalActionTypes.REMOVE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class LoadedHashtagGoal implements Action {
  readonly type = HashtagGoalActionTypes.LOADED;
  constructor(
    public payload: HashtagGoal[],
    public correlationId?: string,
  ) {}
}

export class AddedHashtagGoal implements Action {
  readonly type = HashtagGoalActionTypes.ADDED;
  constructor(
    public payload: HashtagGoal,
    public correlationId?: string,
  ) {}
}

export class ModifiedHashtagGoal implements Action {
  readonly type = HashtagGoalActionTypes.MODIFIED;
  constructor(
    public payload: HashtagGoal,
    public correlationId?: string,
  ) {}
}

export class RemovedHashtagGoal implements Action {
  readonly type = HashtagGoalActionTypes.REMOVED;
  constructor(
    public payload: HashtagGoal,
    public correlationId?: string,
  ) {}
}

export type HashtagGoalActions =
  LoadHashtagGoal |
  LoadHashtagGoalSuccess |
  LoadHashtagGoalFail |
  AddHashtagGoal |
  AddHashtagGoalSuccess |
  AddHashtagGoalFail |
  UpdateHashtagGoal |
  UpdateHashtagGoalSuccess |
  UpdateHashtagGoalFail |
  UpsertHashtagGoal |
  UpsertHashtagGoalSuccess |
  UpsertHashtagGoalFail |
  RemoveHashtagGoal |
  RemoveHashtagGoalSuccess |
  RemoveHashtagGoalFail |
  LoadedHashtagGoal |
  AddedHashtagGoal |
  ModifiedHashtagGoal |
  RemovedHashtagGoal;
