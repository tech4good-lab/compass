import { Injectable } from '@angular/core';
import { CachedSelectorsService } from './cached-selectors.service';

import { AuthSelectorsService } from './auth/auth.selectors';

// Entity Selectors
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
    private weekGoal: WeekGoalSelectorsService,
    private quarterGoal: QuarterGoalSelectorsService,
    private user: UserSelectorsService,
  ) { }

  public createId = this.cachedSelectors.createId;
  public release = this.cachedSelectors.release;

  public selectAuthUser = this.auth.selectAuthUser;

  // Entity Selectors
  public selectUser = this.user.selectUser;
  public selectUsers = this.user.selectUsers;
}