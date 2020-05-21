import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../core/store/app.reducer';
import * as fromAuth from '../../core/store/auth/auth.reducer';
import { FirebaseService } from '../../core/firebase/firebase.service';
import { firestore } from 'firebase/app';
import { Observable, timer, merge, of, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { mergeMap, tap, map, withLatestFrom, take, takeUntil } from 'rxjs/operators';

import { DashboardState } from './+state/dashboard.state';
import { DashboardSelectors } from './+state/dashboard.state.selectors';

import { LoadData, Cleanup } from './+state/dashboard.state.actions';
import { RouterNavigate } from '../../core/store/app.actions';

import { User, SetupType } from '../../core/store/user/user.model';
import { CalendarEvent } from '../../core/store/calendar-event/calendar-event.model';
import { WeekGoal } from '../../core/store/week-goal/week-goal.model';
import { QuarterGoal } from '../../core/store/quarter-goal/quarter-goal.model';
import { WeekGoalWithEvents, UpcomingEventsData, WeekGoalProgress } from './+state/dashboard.model';
import { startOfWeek, endOfTomorrow, endOfToday } from '../../core/utils/date.utils';

/** The day-to-day view for compass. */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {

  // --------------- ROUTE PARAMS & CURRENT USER ---------
  
  /** The currently signed in user. */
  currentUser$: Observable<User> = this.store.pipe(select(fromAuth.selectUser));

  /** The beginning of the current week. */
  startOfWeek$: Observable<Date> = of(new Date()).pipe(
    mergeMap(date => {

      const beginning = startOfWeek(date);
      const delayTillNextWeek = beginning.getTime() + 604800000 - date.getTime() + 10;

      return merge(
        of(startOfWeek(date)),
        timer(delayTillNextWeek, 604800000).pipe(
          map(() => startOfWeek(new Date()))
        )
      );
    })
  );

  /** The current time, updated at the start of each minute. */
  time$: Observable<Date> = of(new Date()).pipe(
    mergeMap(date => {
      const seconds = date.getSeconds();
      const milliseconds = date.getMilliseconds();

      const delayTillNextMin = (59 - seconds) * 1000 + (1000 - milliseconds) + 10;

      return merge(
        of(date),
        timer(delayTillNextMin, 60*1000).pipe(
          map(() => new Date())
        )
      );
    })
  );

 
  // --------------- DB ENTITY DATA ----------------------

  /** This quarters goals. This is just all incomplete quarterly goals. */
  quarterGoals$: Observable<QuarterGoal[]> = this.selectors.selectQuarterGoals(this.currentUser$);

  /** This weeks goals. This is just all incomplete weekly goals. */
  weekGoals$: Observable<WeekGoalWithEvents[]> = this.selectors.selectWeekGoals(this.currentUser$, this.startOfWeek$);
  
  // --------------- LOCAL UI STATE ----------------------



    // // Returns whether scrollbars show up on scrollable elements.
    // // This is false on Macs when the "General > Show scroll bars" setting is
    // // not set to "Always" (the default is "When scrolling"). The approach
    // // taken here is to create an element that will scroll and then compare
    // // its outer width (including scrollbars) to its inner width (excluding
    // // scrollbars).
    // areScrollbarsVisible() {
    //     var scrollableElem = document.createElement('div'),
    //         innerElem = document.createElement('div');
    //     scrollableElem.style.width = '30px';
    //     scrollableElem.style.height = '30px';
    //     scrollableElem.style.overflow = 'scroll';
    //     scrollableElem.style.borderWidth = '0';
    //     innerElem.style.width = '30px';
    //     innerElem.style.height = '60px';
    //     scrollableElem.appendChild(innerElem);
    //     document.body.appendChild(scrollableElem); // Elements only have width if they're in the layout
    //     var diff = scrollableElem.offsetWidth - scrollableElem.clientWidth;
    //     document.body.removeChild(scrollableElem);
    //     return diff > 0;
    // }
    
    // window.addEventListener('load', this.areScrollbarsVisible() {
    //     // Show scrollbars if they're hidden.
    //     if (!this.areScrollbarsVisible()) {
    //         document.body.classList.add('force-show-scrollbars');
    //     }
    // })
    
  
  
  

  // --------------- DATA BINDING STREAMS ----------------
  
  /** Whether it is time to reorient. */
  reorientType$: Observable<SetupType> = combineLatest(
    this.currentUser$,
    this.startOfWeek$
  ).pipe(
    map(([user, startOfWeek]) => {
      if (user.setupInProgress) {
        // If there is already setup in progress, then return the type
        return user.setupInProgress.type;
      } else {
        // Otherwise, check if we need to initiate a setup process
        // TODO: implement this logic. For now, just return undefined to indicate no setup needed
        return undefined;
      }
    })
  );

  /** This weeks plans. */
  weekPlans$: Observable<WeekGoalProgress[]> = combineLatest(
    this.weekGoals$,
    this.time$
  ).pipe(
    map(([weekGoals, time]) => {
      return weekGoals.map(goal => {
        return Object.assign({}, goal, {
          totalAllocatedMins: goal.calendarEvents.map(e => {
            return (e.end.toDate().getTime() - e.start.toDate().getTime()) / 60000.0;
          }).reduce((a,b) => a + b, 0),
          totalCompletedMins: goal.calendarEvents.filter(e => {
            return e.start.toDate() < time;
          }).map(e => {
            if (e.end.toDate() < time) {
              return (e.end.toDate().getTime() - e.start.toDate().getTime()) / 60000.0;
            } else {
              return (time.getTime() - e.start.toDate().getTime()) / 60000.0;
            }
          }).reduce((a,b) => a + b, 0)
        });
      });
    })
  );
  
  /** Only the upcoming events (today and tomorrow). */
  upcomingEvents$: Observable<UpcomingEventsData> = combineLatest(
    this.weekGoals$,
    this.time$
  ).pipe(
    map(([weekGoals, time]) => {
      return weekGoals.map(goal => {
        // First map to array of processed calendar events per goal
        return goal.calendarEvents.filter(e => {
          // Filter to only events that are upcoming
          return e.start.toDate() < endOfTomorrow(time) && e.end.toDate() > time;
        }).map(e => {
          // Add the needed weekGoalIndex (for colors)
          return Object.assign({}, e, {
            weekGoalIndex: goal.index
          });
        });
      }).reduce((events, goalEvents) => {
        // Then flatten the array of calendar event arrays
        return [...events, ...goalEvents];
      }, []).reduce((data, e) => {
        // Now group the calendar events by today or tomorrow to get result
        if (e.start.toDate() < endOfToday(time)) {
          return { today: [...data.today, e], tomorrow: data.tomorrow };
        } else {
          return { today: data.today, tomorrow: [...data.tomorrow, e] };
        }
      }, { today: [], tomorrow: [] });
    })
  );

  // --------------- EVENT BINDING STREAMS ---------------


  // --------------- OTHER -------------------------------

  /** Unsubscribe observable for subscriptions. */
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private state: DashboardState,
    private route: ActivatedRoute, 
    private selectors: DashboardSelectors,
    private store: Store<fromStore.State>,
    private db: FirebaseService,
  ) { 
    
    // --------------- EVENT HANDLING ----------------------
  
  }

  ngOnInit() {

    // Once everything is set up, load the data for the role.
    this.currentUser$.pipe(
      withLatestFrom(this.startOfWeek$),
      takeUntil(this.unsubscribe$)
    ).subscribe(([user, startOfWeek]) => {
      this.store.dispatch( new LoadData({ 
        currentUser: user,
        startOfWeek: startOfWeek
      }) );
    });
  }

  ngOnDestroy() {
    // Unsubscribe subscriptions.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    // Unsubscribe from firebase connection from load and free up memoized selector values.
    this.store.dispatch( new Cleanup() );
    this.selectors.cleanup();
  }
}
