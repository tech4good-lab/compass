import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import * as fromAuth from './auth/auth.reducer';

// Entity Reducers
import * as fromHashtagGoal from './hashtag-goal/hashtag-goal.reducer';
import * as fromGoal from './goal/goal.reducer';
import * as fromCalendarEvent from './calendar-event/calendar-event.reducer';
import * as fromWeekGoal from './week-goal/week-goal.reducer';
import * as fromQuarterGoal from './quarter-goal/quarter-goal.reducer';
import * as fromUser from './user/user.reducer';

export interface State {
  auth: fromAuth.State;
  router: RouterReducerState;
  // Entity State
  hashtagGoal: fromHashtagGoal.State;
  goal: fromGoal.State;
  calendarEvent: fromCalendarEvent.State;
  weekGoal: fromWeekGoal.State;
  quarterGoal: fromQuarterGoal.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  auth: fromAuth.reducer,
  // Entity Reducers
  hashtagGoal: fromHashtagGoal.reducer,
  goal: fromGoal.reducer,
  calendarEvent: fromCalendarEvent.reducer,
  weekGoal: fromWeekGoal.reducer,
  quarterGoal: fromQuarterGoal.reducer,
  user: fromUser.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];