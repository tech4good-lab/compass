import { Action } from '@ngrx/store';
import { User } from '../user/user.model';
import * as actions from './auth.actions';
import * as fromStore from '../app.reducer';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null
};

export function reducer(state = initialState, action: actions.AuthActions) {
  switch (action.type) {

    case actions.LOADED:
      return {
        user: !action.payload.user ? null : Object.assign({}, action.payload.user)
      };

    default:
      return state;
  }
}

export const selectUser = (state: fromStore.State) => state.auth.user;