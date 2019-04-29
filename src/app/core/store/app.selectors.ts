import { Injectable } from '@angular/core';
import { CachedSelectorsService } from './cached-selectors.service';

import { AuthSelectorsService } from './auth/auth.selectors';

// Entity Selectors
import { UserSelectorsService } from './user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class EntitySelectorService {
  
  constructor(
    private cachedSelectors: CachedSelectorsService,
    private auth: AuthSelectorsService,
    // Entity Selectors
    private user: UserSelectorsService,
  ) { }

  public createId = this.cachedSelectors.createId;
  public release = this.cachedSelectors.release;

  public selectAuthUser = this.auth.selectAuthUser;

  // Entity Selectors
  public selectUser = this.user.selectUser;
  public selectUsers = this.user.selectUsers;
}