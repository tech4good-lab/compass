import { Action } from '@ngrx/store';
import { LoadAction } from '../app.actions';
import { Hashtag } from './hashtag.model';

export enum HashtagActionTypes {
  LOAD = '[Hashtag] load hashtag',
  LOAD_SUCCESS = '[Hashtag] load hashtag success',
  LOAD_FAIL = '[Hashtag] load hashtag fail',
  ADD = '[Hashtag] add hashtag',
  ADD_SUCCESS = '[Hashtag] add hashtag success',
  ADD_FAIL = '[Hashtag] add hashtag fail',
  UPDATE = '[Hashtag] update hashtag',
  UPDATE_SUCCESS = '[Hashtag] update hashtag success',
  UPDATE_FAIL = '[Hashtag] update hashtag fail',
  UPSERT = '[Hashtag] upsert hashtag',
  UPSERT_SUCCESS = '[Hashtag] upsert hashtag success',
  UPSERT_FAIL = '[Hashtag] upsert hashtag fail',
  REMOVE = '[Hashtag] remove hashtag',
  REMOVE_SUCCESS = '[Hashtag] remove hashtag success',
  REMOVE_FAIL = '[Hashtag] remove hashtag fail',
  LOADED = '[Hashtag] loaded',
  ADDED = '[Hashtag] added',
  MODIFIED = '[Hashtag] modified',
  REMOVED  = '[Hashtag] removed',
}

// See Firebase Docs for current constraints on valid queries
export class LoadHashtag implements Action {
  readonly type = HashtagActionTypes.LOAD;
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
    public followupActions?: (hashtag: Hashtag) => LoadAction[],
  ) {}
}

export class LoadHashtagSuccess implements Action {
  readonly type = HashtagActionTypes.LOAD_SUCCESS;
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
    public followupActions?: (hashtag: Hashtag) => LoadAction[],
  ) {}
}

export class LoadHashtagFail implements Action {
  readonly type = HashtagActionTypes.LOAD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class AddHashtag implements Action {
  readonly type = HashtagActionTypes.ADD;
  constructor(
    public hashtag: Hashtag,
    public correlationId?: string,
  ) {}
}

export class AddHashtagSuccess implements Action {
  readonly type = HashtagActionTypes.ADD_SUCCESS;
  constructor(
    public hashtag: Hashtag,
    public correlationId?: string,
  ) {}
}

export class AddHashtagFail implements Action {
  readonly type = HashtagActionTypes.ADD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class UpdateHashtag implements Action {
  readonly type = HashtagActionTypes.UPDATE;
  constructor(
    public __id: string,
    public changes: Partial<Hashtag>,
    public correlationId?: string,
  ) { }
}

export class UpdateHashtagSuccess implements Action {
  readonly type = HashtagActionTypes.UPDATE_SUCCESS;
  constructor(
    public __id: string,
    public changes: Partial<Hashtag>,
    public correlationId?: string,
  ) {}
}

export class UpdateHashtagFail implements Action {
  readonly type = HashtagActionTypes.UPDATE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class UpsertHashtag implements Action {
  readonly type = HashtagActionTypes.UPSERT;
  constructor(
    public hashtag: Hashtag,
    public correlationId?: string,
  ) {}
}

export class UpsertHashtagSuccess implements Action {
  readonly type = HashtagActionTypes.UPSERT_SUCCESS;
  constructor(
    public hashtag: Hashtag,
    public correlationId?: string,
  ) {}
}

export class UpsertHashtagFail implements Action {
  readonly type = HashtagActionTypes.UPSERT_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class RemoveHashtag implements Action {
  readonly type = HashtagActionTypes.REMOVE;
  constructor(
    public __id: string,
    public correlationId?: string,
  ) { }
}

export class RemoveHashtagSuccess implements Action {
  readonly type = HashtagActionTypes.REMOVE_SUCCESS;
  constructor(
    public __id: string,
    public correlationId?: string,
  ) {}
}

export class RemoveHashtagFail implements Action {
  readonly type = HashtagActionTypes.REMOVE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string,
  ) {}
}

export class LoadedHashtag implements Action {
  readonly type = HashtagActionTypes.LOADED;
  constructor(
    public payload: Hashtag[],
    public correlationId?: string,
  ) {}
}

export class AddedHashtag implements Action {
  readonly type = HashtagActionTypes.ADDED;
  constructor(
    public payload: Hashtag,
    public correlationId?: string,
  ) {}
}

export class ModifiedHashtag implements Action {
  readonly type = HashtagActionTypes.MODIFIED;
  constructor(
    public payload: Hashtag,
    public correlationId?: string,
  ) {}
}

export class RemovedHashtag implements Action {
  readonly type = HashtagActionTypes.REMOVED;
  constructor(
    public payload: Hashtag,
    public correlationId?: string,
  ) {}
}

export type HashtagActions =
  LoadHashtag |
  LoadHashtagSuccess |
  LoadHashtagFail |
  AddHashtag |
  AddHashtagSuccess |
  AddHashtagFail |
  UpdateHashtag |
  UpdateHashtagSuccess |
  UpdateHashtagFail |
  UpsertHashtag |
  UpsertHashtagSuccess |
  UpsertHashtagFail |
  RemoveHashtag |
  RemoveHashtagSuccess |
  RemoveHashtagFail |
  LoadedHashtag |
  AddedHashtag |
  ModifiedHashtag |
  RemovedHashtag;
