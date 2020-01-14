import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HashtagGoal } from './hashtag-goal.model';
import { HashtagGoalActions, HashtagGoalActionTypes } from './hashtag-goal.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<HashtagGoal> {
  // additional entities state properties
}

export const adapter: EntityAdapter<HashtagGoal> = createEntityAdapter<HashtagGoal>({
  selectId: (hashtagGoal: HashtagGoal) => hashtagGoal.__id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state: State = initialState,
  action: HashtagGoalActions) {

  switch (action.type) {

    case HashtagGoalActionTypes.ADDED:
      return adapter.upsertOne(action.payload, state);

    case HashtagGoalActionTypes.LOADED:
      return adapter.upsertMany(action.payload, state);

    case HashtagGoalActionTypes.MODIFIED:
      return adapter.updateOne({
        id: action.payload.__id,
        changes: action.payload,
      }, state);

    case HashtagGoalActionTypes.REMOVED:
      return adapter.removeOne(action.payload.__id, state);

    default:
      return state;
  }
}

export const getHashtagGoalState = createFeatureSelector<State>('hashtagGoal');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getHashtagGoalState);
