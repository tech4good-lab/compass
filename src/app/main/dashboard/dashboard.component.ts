import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../core/store/app.reducer';
import * as fromAuth from '../../core/store/auth/auth.reducer';
import { FirebaseService } from '../../core/firebase/firebase.service';
import { firestore } from 'firebase/app';
import { Observable, timer, merge, of, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { mergeMap, tap, map, withLatestFrom, take, takeUntil, timestamp } from 'rxjs/operators';

import { DashboardState } from './+state/dashboard.state';
import { DashboardSelectors } from './+state/dashboard.state.selectors';

import { LoadData, Cleanup } from './+state/dashboard.state.actions';
import { RouterNavigate } from '../../core/store/app.actions';

import { User, SetupType } from '../../core/store/user/user.model';
import { CalendarEvent } from '../../core/store/calendar-event/calendar-event.model';
import { WeekGoal } from '../../core/store/week-goal/week-goal.model';
import { QuarterGoal } from '../../core/store/quarter-goal/quarter-goal.model';
import { WeekGoalWithEvents, UpcomingEventsData, WeekGoalProgress, QuarterDates } from './+state/dashboard.model';
import { startOfWeek, endOfTomorrow, endOfToday, timestampAfterMilliseconds } from '../../core/utils/date.utils';

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

  upcomingEvents$: Observable<UpcomingEventsData> = of({ 
    today: [
      {
        __id: 'weekgoal1',
        __userId: 'user',
        __weekGoalId: 'wg1',
        weekGoalIndex: 1,
        _createdAt: firestore.Timestamp.fromMillis(1566245122000),
        _updatedAt: firestore.Timestamp.fromMillis(1566237922000),
        calendarId: 'ce1',
        start: firestore.Timestamp.fromMillis(1566245122000),
        end: firestore.Timestamp.fromMillis(1566252322000),
        summary: 'practice piano for two hours',
        description: 'practice piano',
        hashtag: 'piano',
        backgroundColor: 'linear-gradient(90.81deg, #EE8B72 -3.96%, #FFB987 110.33%)'
      }
    ],
    tomorrow: [
      {
        __id: 'weekgoal2',
        __userId: 'user',
        __weekGoalId: 'wg2',
        weekGoalIndex: 2,
        _createdAt: firestore.Timestamp.fromMillis(1566237922000),
        _updatedAt: firestore.Timestamp.fromMillis(1566237922000),
        calendarId: 'ce2',
        start: firestore.Timestamp.fromMillis(1566320722000),
        end: firestore.Timestamp.fromMillis(1566327922000),
        summary: 'practice violin for two hours',
        description: 'practice violin',
        hashtag: 'violin',
        backgroundColor: 'linear-gradient(90deg, #FFB987 -4%, #FFD699 106.5%)'
      },
      {
        __id: 'weekgoal3',
        __userId: 'user',
        __weekGoalId: 'wg3',
        weekGoalIndex: 3,
        _createdAt: firestore.Timestamp.fromMillis(1566237922000),
        _updatedAt: firestore.Timestamp.fromMillis(1566237922000),
        calendarId: 'ce3',
        start: firestore.Timestamp.fromMillis(1566331522000),
        end: firestore.Timestamp.fromMillis(1566338722000),
        summary: 'work on resume',
        description: 'work on resume',
        hashtag: 'resume',
        backgroundColor: 'linear-gradient(90deg, #2DBDB1 -4.5%, #80E6DE 104.9%)'
      }
    ]
  })

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
  
  // /** Only the upcoming events (today and tomorrow). */
  // upcomingEvents$: Observable<UpcomingEventsData> = combineLatest(
  //   this.weekGoals$,
  //   this.time$
  // ).pipe(
  //   map(([weekGoals, _]) => {
  //     let time = timestampAfterMilliseconds(0, 1566241200).toDate();
  //     return weekGoals.map(goal => {
  //       // First map to array of processed calendar events per goal
  //       return goal.calendarEvents.filter(e => {
  //         // Filter to only events that are upcoming
  //         return e.start.toDate() < endOfTomorrow(time) && e.end.toDate() > time;
  //       }).map(e => {
  //         // Add the needed weekGoalIndex (for colors)
  //         return Object.assign({}, e, {
  //           weekGoalIndex: goal.index
  //         });
  //       });
  //     }).reduce((events, goalEvents) => {
  //       // Then flatten the array of calendar event arrays
  //       return [...events, ...goalEvents];
  //     }, []).reduce((data, e) => {
  //       // Now group the calendar events by today or tomorrow to get result
  //       // if (e.start.toDate() < endOfToday(time)) {
  //       //   return { today: [...data.today, e], tomorrow: data.tomorrow };
  //       // } else {
  //         return { today: data.today, tomorrow: [...data.tomorrow, e] };
  //      //}
  //     }, { today: [], tomorrow: [] });
  //   })
  // );

  quarterDates$: Observable<QuarterDates> = combineLatest(this.startOfWeek$).pipe(map(startOfWeek => {
    let currYear: number;
    let futureYear: number
    let currMonth: number;
    let currTime: Date
    startOfWeek.map(time => {
      currYear = time.getFullYear();
      currMonth = time.getMonth();
      currTime = time
    })

    //needs to be fixed
    if(currMonth < 8) {
      futureYear = currYear + 1;
    }
    else{
      futureYear = currYear
      currYear--
    }
    //console.log(futureYear)
    let quarterDates = [
      {
        season: 'Fall',
        year: currYear,
        start: new Date('September 21, ' + (currYear).toString()),
        end: new Date('December 13, ' + (currYear).toString())
      },
      {
        season: 'Winter',
        year: futureYear,
        start: new Date('December 14, ' + (currYear).toString()),
        end: new Date('March 29, ' + (futureYear).toString())
      },
      {
        season: 'Spring',
        year: futureYear,
        start: new Date('March 30, '+(futureYear).toString()),
        end: new Date('June 11, '+(futureYear).toString())
      },
      {
        season: 'Summer',
        year: futureYear,
        start: new Date('June 12, '+ (futureYear).toString()),
        end: new Date('September 20, '+(futureYear).toString())
      }
    ]
    let quarter = quarterDates[0]
    quarterDates.forEach(q => {
      if(currTime >= q.start && currTime <= q.end){
        
        quarter = q
      }
    })
    return quarter;
  }))

  // --------------- EVENT BINDING STREAMS ---------------

  /** Allow the user to edit their goals. */
  editGoals$: Subject<void> = new Subject<void>();

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
    
    /** Event to handle editing goals. */
    this.editGoals$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      console.log("editing the event now!")
    })
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
