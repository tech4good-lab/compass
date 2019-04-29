import { Action } from '@ngrx/store';
import { LoadAction } from '../app.actions';
import { CalendarEvent } from './calendar-event.model';

export enum CalendarEventActionTypes {
  LOAD = '[CalendarEvent] load calendarEvent',
  LOAD_SUCCESS = '[CalendarEvent] load calendarEvent success',
  LOAD_FAIL = '[CalendarEvent] load calendarEvent fail',
  ADD = '[CalendarEvent] add calendarEvent',
  ADD_SUCCESS = '[CalendarEvent] add calendarEvent success',
  ADD_FAIL = '[CalendarEvent] add calendarEvent fail',
  UPDATE = '[CalendarEvent] update calendarEvent',
  UPDATE_SUCCESS = '[CalendarEvent] update calendarEvent success',
  UPDATE_FAIL = '[CalendarEvent] update calendarEvent fail',
  UPSERT = '[CalendarEvent] upsert calendarEvent',
  UPSERT_SUCCESS = '[CalendarEvent] upsert calendarEvent success',
  UPSERT_FAIL = '[CalendarEvent] upsert calendarEvent fail',
  REMOVE = '[CalendarEvent] remove calendarEvent',
  REMOVE_SUCCESS = '[CalendarEvent] remove calendarEvent success',
  REMOVE_FAIL = '[CalendarEvent] remove calendarEvent fail',
  LOADED = '[CalendarEvent] loaded',
  ADDED = '[CalendarEvent] added',
  MODIFIED = '[CalendarEvent] modified',
  REMOVED  = '[CalendarEvent] removed'
}

// See Firebase Docs for current constraints on valid queries
export class LoadCalendarEvent implements Action {
  readonly type = CalendarEventActionTypes.LOAD;
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
    public followupActions?: (calendarEvent: CalendarEvent) => LoadAction[]
  ) {}
}

export class LoadCalendarEventSuccess implements Action {
  readonly type = CalendarEventActionTypes.LOAD_SUCCESS;
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
    public followupActions?: (calendarEvent: CalendarEvent) => LoadAction[]
  ) {}
}

export class LoadCalendarEventFail implements Action {
  readonly type = CalendarEventActionTypes.LOAD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class AddCalendarEvent implements Action {
  readonly type = CalendarEventActionTypes.ADD;
  constructor(
    public calendarEvent: CalendarEvent,
    public correlationId?: string
  ) {}
}

export class AddCalendarEventSuccess implements Action {
  readonly type = CalendarEventActionTypes.ADD_SUCCESS;
  constructor(
    public calendarEvent: CalendarEvent,
    public correlationId?: string
  ) {}
}

export class AddCalendarEventFail implements Action {
  readonly type = CalendarEventActionTypes.ADD_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class UpdateCalendarEvent implements Action {
  readonly type = CalendarEventActionTypes.UPDATE;
  constructor(
    public __id: string,
    public changes: Partial<CalendarEvent>,
    public correlationId?: string
  ) { }
}

export class UpdateCalendarEventSuccess implements Action {
  readonly type = CalendarEventActionTypes.UPDATE_SUCCESS;
  constructor(
    public __id: string,
    public changes: Partial<CalendarEvent>,
    public correlationId?: string
  ) {}
}

export class UpdateCalendarEventFail implements Action {
  readonly type = CalendarEventActionTypes.UPDATE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class UpsertCalendarEvent implements Action {
  readonly type = CalendarEventActionTypes.UPSERT;
  constructor(
    public calendarEvent: CalendarEvent,
    public correlationId?: string
  ) {}
}

export class UpsertCalendarEventSuccess implements Action {
  readonly type = CalendarEventActionTypes.UPSERT_SUCCESS;
  constructor(
    public calendarEvent: CalendarEvent,
    public correlationId?: string
  ) {}
}

export class UpsertCalendarEventFail implements Action {
  readonly type = CalendarEventActionTypes.UPSERT_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class RemoveCalendarEvent implements Action {
  readonly type = CalendarEventActionTypes.REMOVE;
  constructor(
    public __id: string,
    public correlationId?: string
  ) { }
}

export class RemoveCalendarEventSuccess implements Action {
  readonly type = CalendarEventActionTypes.REMOVE_SUCCESS;
  constructor(
    public __id: string,
    public correlationId?: string
  ) {}
}

export class RemoveCalendarEventFail implements Action {
  readonly type = CalendarEventActionTypes.REMOVE_FAIL;
  constructor(
    public error: any,
    public correlationId?: string
  ) {}
}

export class LoadedCalendarEvent implements Action {
  readonly type = CalendarEventActionTypes.LOADED;
  constructor(
    public payload: CalendarEvent[],
    public correlationId?: string
  ) {}
}

export class AddedCalendarEvent implements Action {
  readonly type = CalendarEventActionTypes.ADDED;
  constructor(
    public payload: CalendarEvent,
    public correlationId?: string
  ) {}
}

export class ModifiedCalendarEvent implements Action {
  readonly type = CalendarEventActionTypes.MODIFIED;
  constructor(
    public payload: CalendarEvent,
    public correlationId?: string
  ) {}
}

export class RemovedCalendarEvent implements Action {
  readonly type = CalendarEventActionTypes.REMOVED;
  constructor(
    public payload: CalendarEvent,
    public correlationId?: string
  ) {}
}

export type CalendarEventActions =
  LoadCalendarEvent |
  LoadCalendarEventSuccess |
  LoadCalendarEventFail |
  AddCalendarEvent |
  AddCalendarEventSuccess |
  AddCalendarEventFail |
  UpdateCalendarEvent |
  UpdateCalendarEventSuccess |
  UpdateCalendarEventFail |
  UpsertCalendarEvent |
  UpsertCalendarEventSuccess |
  UpsertCalendarEventFail |
  RemoveCalendarEvent |
  RemoveCalendarEventSuccess |
  RemoveCalendarEventFail |
  LoadedCalendarEvent |
  AddedCalendarEvent |
  ModifiedCalendarEvent |
  RemovedCalendarEvent;