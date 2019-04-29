import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { QuarterGoal } from './quarter-goal.model';
import { QuarterGoalActions, QuarterGoalActionTypes } from './quarter-goal.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<QuarterGoal> {
  // additional entities state properties
}

export const adapter: EntityAdapter<QuarterGoal> = createEntityAdapter<QuarterGoal>({
  selectId: (quarterGoal: QuarterGoal) => quarterGoal.__id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state: State = initialState,
  action: QuarterGoalActions) {

  switch (action.type) {

    case QuarterGoalActionTypes.ADDED:
      return adapter.upsertOne(action.payload, state)

    case QuarterGoalActionTypes.LOADED:
      return adapter.upsertMany(action.payload, state)

    case QuarterGoalActionTypes.MODIFIED:
      return adapter.updateOne({
        id: action.payload.__id,
        changes: action.payload
      }, state)

    case QuarterGoalActionTypes.REMOVED:
      return adapter.removeOne(action.payload.__id, state)

    default:
      return state;
  }
}

export const getQuarterGoalState = createFeatureSelector<State>('quarterGoal');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getQuarterGoalState);