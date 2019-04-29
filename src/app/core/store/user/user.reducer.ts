import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user.model';
import { UserActions, UserActionTypes } from './user.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<User> {
  // additional entities state properties
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.__id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state: State = initialState,
  action: UserActions) {

  switch (action.type) {

    case UserActionTypes.ADDED:
      return adapter.upsertOne(action.payload, state)

    case UserActionTypes.LOADED:
      return adapter.upsertMany(action.payload, state)

    case UserActionTypes.MODIFIED:
      return adapter.updateOne({
        id: action.payload.__id,
        changes: action.payload
      }, state)

    case UserActionTypes.REMOVED:
      return adapter.removeOne(action.payload.__id, state)

    default:
      return state;
  }
}

export const getUserState = createFeatureSelector<State>('user');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getUserState);