import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { WeekGoal } from './week-goal.model';
import { WeekGoalActions, WeekGoalActionTypes } from './week-goal.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<WeekGoal> {
  // additional entities state properties
}

export const adapter: EntityAdapter<WeekGoal> = createEntityAdapter<WeekGoal>({
  selectId: (weekGoal: WeekGoal) => weekGoal.__id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state: State = initialState,
  action: WeekGoalActions) {

  switch (action.type) {

    case WeekGoalActionTypes.ADDED:
      return adapter.upsertOne(action.payload, state)

    case WeekGoalActionTypes.LOADED:
      return adapter.upsertMany(action.payload, state)

    case WeekGoalActionTypes.MODIFIED:
      return adapter.updateOne({
        id: action.payload.__id,
        changes: action.payload
      }, state)

    case WeekGoalActionTypes.REMOVED:
      return adapter.removeOne(action.payload.__id, state)

    default:
      return state;
  }
}

export const getWeekGoalState = createFeatureSelector<State>('weekGoal');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getWeekGoalState);