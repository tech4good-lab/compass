import { Injectable } from '@angular/core';
import { CachedSelectorsService } from './cached-selectors.service';

import { AuthSelectorsService } from './auth/auth.selectors';

// Entity Selectors
import { CalendarEventSelectorsService } from './calendar-event/calendar-event.selectors';
import { WeekGoalSelectorsService } from './week-goal/week-goal.selectors';
import { QuarterGoalSelectorsService } from './quarter-goal/quarter-goal.selectors';
import { UserSelectorsService } from './user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class EntitySelectorService {
  
  constructor(
    private cachedSelectors: CachedSelectorsService,
    private auth: AuthSelectorsService,
    // Entity Selectors
    private calendarEvent: CalendarEventSelectorsService,
    private weekGoal: WeekGoalSelectorsService,
    private quarterGoal: QuarterGoalSelectorsService,
    private user: UserSelectorsService,
  ) { }

  public createId = this.cachedSelectors.createId;
  public release = this.cachedSelectors.release;

  public selectAuthUser = this.auth.selectAuthUser;

  // Entity Selectors
  public selectCalendarEvent = this.calendarEvent.selectCalendarEvent;
  public selectCalendarEvents = this.calendarEvent.selectCalendarEvents;
  public selectWeekGoal = this.weekGoal.selectWeekGoal;
  public selectWeekGoals = this.weekGoal.selectWeekGoals;
  public selectQuarterGoal = this.quarterGoal.selectQuarterGoal;
  public selectQuarterGoals = this.quarterGoal.selectQuarterGoals;
  public selectUser = this.user.selectUser;
  public selectUsers = this.user.selectUsers;
}
