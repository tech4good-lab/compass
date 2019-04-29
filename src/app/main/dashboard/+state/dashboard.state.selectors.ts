import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../core/store/app.reducer';
import { EntitySelectorService } from '../../../core/store/app.selectors';

import { Observable, of, combineLatest } from 'rxjs';
import { bufferTime, distinctUntilChanged, shareReplay, mergeMap, filter, switchMap, map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

import { User } from '../../../core/store/user/user.model';
import { WeekGoal } from '../../../core/store/week-goal/week-goal.model';
import { WeekGoalWithEvents } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardSelectors {

  cId = this.slRx.createId();

  constructor(
    private slRx: EntitySelectorService
  ) { }

  cleanup() {
    this.slRx.release(this.cId);
  }

  selectQuarterGoals = (currentUser$) => currentUser$.pipe(
    switchMap((currentUser: User) => {

      return this.slRx.selectQuarterGoals([['__userId', '==', currentUser.__id], ['completed', '==', false]], this.cId);
    })
  );

  selectWeekGoals = (currentUser$, startOfWeek$) => combineLatest(
    currentUser$,
    startOfWeek$.pipe(map((date: Date) => firestore.Timestamp.fromDate(date)))
  ).pipe(
    switchMap(([currentUser, startOfWeek]: [User, firestore.Timestamp]) => {

      return this.slRx.selectWeekGoals<WeekGoalWithEvents>([['__userId', '==', currentUser.__id], ['completed', '==', false]], this.cId, (wk) => ({
        calendarEvents: this.slRx.selectCalendarEvents([['__weekGoalId', '==', wk.__id], ['start', '>=', startOfWeek]], this.cId)
      }));
    })
  );
}
