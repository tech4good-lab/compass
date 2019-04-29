import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../app.reducer';
import * as fromAuth from './auth.reducer';

import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthSelectorsService {

  constructor(
    private store: Store<fromStore.State>,
  ) { }

  public selectAuthUser = (): Observable<User> => {

    return this.store.pipe(select(fromAuth.selectUser));
  }
}