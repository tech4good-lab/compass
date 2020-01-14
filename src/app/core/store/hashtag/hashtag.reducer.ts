import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Hashtag } from './hashtag.model';
import { HashtagActions, HashtagActionTypes } from './hashtag.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<Hashtag> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Hashtag> = createEntityAdapter<Hashtag>({
  selectId: (hashtag: Hashtag) => hashtag.__id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state: State = initialState,
  action: HashtagActions) {

  switch (action.type) {

    case HashtagActionTypes.ADDED:
      return adapter.upsertOne(action.payload, state);

    case HashtagActionTypes.LOADED:
      return adapter.upsertMany(action.payload, state);

    case HashtagActionTypes.MODIFIED:
      return adapter.updateOne({
        id: action.payload.__id,
        changes: action.payload,
      }, state);

    case HashtagActionTypes.REMOVED:
      return adapter.removeOne(action.payload.__id, state);

    default:
      return state;
  }
}

export const getHashtagState = createFeatureSelector<State>('hashtag');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getHashtagState);
