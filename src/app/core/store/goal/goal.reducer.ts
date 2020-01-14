import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Goal } from './goal.model';
import { GoalActions, GoalActionTypes } from './goal.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<Goal> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Goal> = createEntityAdapter<Goal>({
  selectId: (goal: Goal) => goal.__id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state: State = initialState,
  action: GoalActions) {

  switch (action.type) {

    case GoalActionTypes.ADDED:
      return adapter.upsertOne(action.payload, state);

    case GoalActionTypes.LOADED:
      return adapter.upsertMany(action.payload, state);

    case GoalActionTypes.MODIFIED:
      return adapter.updateOne({
        id: action.payload.__id,
        changes: action.payload,
      }, state);

    case GoalActionTypes.REMOVED:
      return adapter.removeOne(action.payload.__id, state);

    default:
      return state;
  }
}

export const getGoalState = createFeatureSelector<State>('goal');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getGoalState);
