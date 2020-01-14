import { Injectable } from '@angular/core';
import { CachedSelectorsService } from './cached-selectors.service';

import { AuthSelectorsService } from './auth/auth.selectors';

// Entity Selectors
import { HashtagService } from './hashtag/hashtag.service';
import { HashtagGoalService } from './hashtag-goal/hashtag-goal.service';
import { GoalService } from './goal/goal.service';
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
    private hashtag: HashtagService,
    private hashtagGoal: HashtagGoalService,
    private goal: GoalService,
    private calendarEvent: CalendarEventSelectorsService,
    private weekGoal: WeekGoalSelectorsService,
    private quarterGoal: QuarterGoalSelectorsService,
    private user: UserSelectorsService,
  ) { }

  public createId = this.cachedSelectors.createId;
  public release = this.cachedSelectors.release;

  public selectAuthUser = this.auth.selectAuthUser;

  // Entity Selectors
  public getHashtag = this.hashtag.getHashtag;
  public getHashtags = this.hashtag.getHashtags;
  public selectHashtag = this.hashtag.selectHashtag;
  public selectHashtags = this.hashtag.selectHashtags;
  public getHashtagGoal = this.hashtagGoal.getHashtagGoal;
  public getHashtagGoals = this.hashtagGoal.getHashtagGoals;
  public selectHashtagGoal = this.hashtagGoal.selectHashtagGoal;
  public selectHashtagGoals = this.hashtagGoal.selectHashtagGoals;
  public getGoal = this.goal.getGoal;
  public getGoals = this.goal.getGoals;
  public selectGoal = this.goal.selectGoal;
  public selectGoals = this.goal.selectGoals;
  public selectCalendarEvent = this.calendarEvent.selectCalendarEvent;
  public selectCalendarEvents = this.calendarEvent.selectCalendarEvents;
  public selectWeekGoal = this.weekGoal.selectWeekGoal;
  public selectWeekGoals = this.weekGoal.selectWeekGoals;
  public selectQuarterGoal = this.quarterGoal.selectQuarterGoal;
  public selectQuarterGoals = this.quarterGoal.selectQuarterGoals;
  public selectUser = this.user.selectUser;
  public selectUsers = this.user.selectUsers;
}
