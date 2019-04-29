import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CalendarEvent } from './calendar-event.model';
import { CalendarEventActions, CalendarEventActionTypes } from './calendar-event.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<CalendarEvent> {
  // additional entities state properties
}

export const adapter: EntityAdapter<CalendarEvent> = createEntityAdapter<CalendarEvent>({
  selectId: (calendarEvent: CalendarEvent) => calendarEvent.__id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state: State = initialState,
  action: CalendarEventActions) {

  switch (action.type) {

    case CalendarEventActionTypes.ADDED:
      return adapter.upsertOne(action.payload, state)

    case CalendarEventActionTypes.LOADED:
      return adapter.upsertMany(action.payload, state)

    case CalendarEventActionTypes.MODIFIED:
      return adapter.updateOne({
        id: action.payload.__id,
        changes: action.payload
      }, state)

    case CalendarEventActionTypes.REMOVED:
      return adapter.removeOne(action.payload.__id, state)

    default:
      return state;
  }
}

export const getCalendarEventState = createFeatureSelector<State>('calendarEvent');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getCalendarEventState);