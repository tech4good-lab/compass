import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../core/store/app.reducer';
import * as fromAuth from '../../core/store/auth/auth.reducer';
import { FirebaseService } from '../../core/firebase/firebase.service';
import { Observable, Subject, BehaviorSubject, combineLatest, of, merge, timer } from 'rxjs';
import { withLatestFrom, take, takeUntil, mergeMap, map } from 'rxjs/operators';

import { ReorientState } from './+state/reorient.state';
import { ReorientSelectors } from './+state/reorient.state.selectors';

import { LoadData, Cleanup } from './+state/reorient.state.actions';
import { RouterNavigate } from '../../core/store/app.actions';

import { User } from '../../core/store/user/user.model';
import { QuarterGoal } from '../../core/store/quarter-goal/quarter-goal.model';
import { WeekGoal } from '../../core/store/week-goal/week-goal.model';
import { async } from 'q';
import { startOfWeek } from '../../core/utils/date.utils';

/** Sequence of steps for setting or reorienting goals. */
@Component({
  selector: 'app-reorient',
  templateUrl: './reorient.component.html',
  styleUrls: ['./reorient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReorientComponent implements OnInit, OnDestroy {

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
  // --------------- DB ENTITY DATA ----------------------


  // /** This quarters goals. This is just all incomplete quarterly goals. */
  // quarterGoals$: Observable<QuarterGoal[]> = this.selectors.selectQuarterGoals(this.currentUser$);

  // /** This weeks goals. This is just all incomplete weekly goals. */
  // weekGoals$: Observable<WeekGoal[]> = this.selectors.selectWeekGoals(this.currentUser$, this.startOfWeek$);

  // --------------- UI STATE ----------------------
  slideIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currPathType$: BehaviorSubject<Object>;

  // --------------- DATA BINDING STREAMS ----------------


  // --------------- EVENT BINDING STREAMS ---------------


  // --------------- OTHER -------------------------------

  /** Unsubscribe observable for subscriptions. */
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private state: ReorientState,
    private route: ActivatedRoute, 
    private selectors: ReorientSelectors,
    private store: Store<fromStore.State>,
    private db: FirebaseService,
  ) { 

    // --------------- EVENT HANDLING ----------------------
    
  }
  getUserPathType() {
    let type;
    this.currentUser$.subscribe(user => {
      if(user.setupInProgress){
        type =  user.setupInProgress.type
      }
    })
    return type
  }

  getPathOrder(userType): {} {
    let pathOrder: {}
    const onboardingPaths = [
       {
        type: "initial",
        slideOrder: [
          "text",
          "Long Term Goals",
          "text",
          "Quarter Goals",
          "text",
          "Weekly Goals",
          "text",
          "Organized",
          "Google Calendar",
          "Schedule"
        ],
        progressBar: [
          "Long Term Goals",
          "Quarter Goals",
          "Weekly Goals",
          "Organize",
          "Schedule"
        ]
      },
      {
        type: "week",
        slideOrder: [
          "Review",
          "Weekly Goals",
          "Organized",
          "Schedule",
        ],
        progressBar: [
          "Review",
          "Weekly Goals",
          "Organize",
          "Schedule"
        ]
      },
      {
        type: "quarter",
        slideOrder: [
          "Review",
          "Quarter Goals",
          "Weekly Goals",
          "Organized",
          "Schedule",
        ],
        progressBar: [
          "Review",
          "Quarter Goals",
          "Weekly Goals",
          "Organize",
          "Schedule"
        ]
       }
     ];
     onboardingPaths.forEach(path => {
     if(userType === path.type) {
       pathOrder =  path;
     }
     })
     return pathOrder
   
  }

  getCurrentSlide() {
    let currSlide: string;
    this.currPathType$.subscribe(path => { currSlide = path['slideOrder'][this.slideIndex$.getValue()] })
    return currSlide;
    }
  
  nextSlide() {
    let currValue = this.slideIndex$.getValue() + 1
    this.slideIndex$.next(currValue);
  }
  
  prevSlide() {
    let currValue = this.slideIndex$.getValue() - 1
    this.slideIndex$.next(currValue);
  }

  getProgressBar() {
    let progressArray: Array<string>
    this.currPathType$.subscribe(path => { progressArray = path['progressBar']})
    return progressArray
  }
  assembleTitle() {
    let index: number;
    let title: string;
    let username;
    this.currentUser$.subscribe(u => username = u.name)
    this.slideIndex$.subscribe(i => index = i);
    
    switch(index) {
      case 0:
        title = "Welcome, " + username
      break;
      case 2:
        title = "Nice work."
      break;
      case 4:
        title = "One step at a time."
      break;
      case 6:
        title = "Let's get organized."
      break;
    }
    return title;
  }

  assembleDesc() {
    let index: number;
    let desc: string;
    this.slideIndex$.subscribe(i => index = i);
    
    switch(index) {
      case 0:
        desc = "Compass helps you set goals and reach them. Let's get started."
      break;
      case 2:
        desc = "What can you do this quarter to reach your long term goals?"
      break;
      case 4:
        desc = "Weekly planning will keep you on track to achieve your goals."
      break;
      case 6:
        desc = "We categorize your weekly goals with hashtags."
      break;
    }
    return desc;
  }

  ngOnInit() {

    // Once everything is set up, load the data for the role.
    this.currentUser$.pipe(takeUntil(this.unsubscribe$), withLatestFrom(this.startOfWeek$)).subscribe(([user, startOfWeek]) => {
      this.store.dispatch( new LoadData({
        currentUser: user,
        startOfWeek: startOfWeek
      }));
    })
    
    this.currPathType$ = new BehaviorSubject<Object>(this.getPathOrder(this.getUserPathType()));
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