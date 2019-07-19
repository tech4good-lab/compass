import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { ParamMap, ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import * as fromStore from "../../core/store/app.reducer";
import * as fromAuth from "../../core/store/auth/auth.reducer";
import { FirebaseService } from "../../core/firebase/firebase.service";
import {
  Observable,
  Subject,
  BehaviorSubject,
  combineLatest,
  of,
  merge,
  timer
} from "rxjs";
import { withLatestFrom, take, takeUntil, mergeMap, map } from "rxjs/operators";

import { ReorientState } from "./+state/reorient.state";
import { ReorientSelectors } from "./+state/reorient.state.selectors";

import {
  LoadData,
  Cleanup,
  UpdateState
} from "./+state/reorient.state.actions";
import { RouterNavigate } from "../../core/store/app.actions";

import { User, LongTermGoals } from "../../core/store/user/user.model";
import { QuarterGoal } from "../../core/store/quarter-goal/quarter-goal.model";
import { WeekGoal } from "../../core/store/week-goal/week-goal.model";
import { startOfWeek } from "../../core/utils/date.utils";
import { WeekGoalWithEvents } from "./+state/reorient.model";
import { FirebaseMockService } from "../../core/firebase/firebase.mock.service";
import { firestore } from "firebase/app";

/** Sequence of steps for setting or reorienting goals. */
@Component({
  selector: "app-reorient",
  templateUrl: "./reorient.component.html",
  styleUrls: ["./reorient.component.scss"],
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
      const delayTillNextWeek =
        beginning.getTime() + 604800000 - date.getTime() + 10;

      return merge(
        of(startOfWeek(date)),
        timer(delayTillNextWeek, 604800000).pipe(
          map(() => startOfWeek(new Date()))
        )
      );
    })
  );
  // --------------- DB ENTITY DATA ----------------------

  /** This quarters goals. This is just all incomplete quarterly goals. */
  quarterGoals$: Observable<QuarterGoal[]> = this.selectors.selectQuarterGoals(
    this.currentUser$
  );

  /** This weeks goals with events. This is just all incomplete weekly goals. */
  weekGoalsWithEvents$: Observable<
    WeekGoalWithEvents[]
  > = this.selectors.selectWeekGoalsAndEvents(
    this.currentUser$,
    this.startOfWeek$
  );

  /** This weeks goals with events. This is just all incomplete weekly goals. */
  weekGoals$: Observable<WeekGoal[]> = this.selectors.selectWeekGoals(
    this.currentUser$,
    this.startOfWeek$
  );

  // --------------- UI STATE ----------------------
  /**  The index of the slide that the user is on currently */
  slideIndex$: BehaviorSubject<number>;

  /**  The object containing the path type, the progress bar titles, and the order of the slides */
  currPathType$: BehaviorSubject<Object>;

  // --------------- DATA BINDING STREAMS ----------------
  finishedWeekGoals$: Observable<WeekGoal[]> = combineLatest(this.weekGoals$).pipe(
    mergeMap(weekGoals => {
      return weekGoals.map(goal => {
        return goal.map(g => {
          if(g.completed == false){
            console.log(g)
          return g;
          }
        });
      });
    })
  );

  finishedQuarterGoals$: Observable<QuarterGoal[]> = combineLatest(
    this.quarterGoals$
  ).pipe(
    mergeMap(quarterGoals => {
      return quarterGoals.map(goal => {
        return goal.map(g => {
          if(g.completed == false){
          return g;
          }
        });
      });
    })
  );

  // --------------- EVENT BINDING STREAMS ---------------
  submitLongTermGoals$: Subject<LongTermGoals> = new Subject<LongTermGoals>();
  submitQuarterGoals$: Subject<QuarterGoal[]> = new Subject<QuarterGoal[]>();
  submitWeekGoals$: Subject<WeekGoal[]> = new Subject<WeekGoal[]>();
  changedWeekGoalsHashtag$: Subject<WeekGoal[]> = new Subject<WeekGoal[]>();
  checkWeekGoals$: Subject<WeekGoal[]> = new Subject<WeekGoal[]>();
  checkQuarterGoals$: Subject<QuarterGoal[]> = new Subject<QuarterGoal[]>();


  // --------------- OTHER -------------------------------

  /** Unsubscribe observable for subscriptions. */
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private state: ReorientState,
    private route: ActivatedRoute,
    private selectors: ReorientSelectors,
    private store: Store<fromStore.State>,
    private db: FirebaseService,
    private mdb: FirebaseMockService
  ) {
    // --------------- EVENT HANDLING ----------------------
    this.submitLongTermGoals$
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.currentUser$)
      )
      .subscribe(([goalArray, user]) => {
        user.longTermGoals = goalArray;
        user.setupInProgress.longTermGoals = goalArray;
        this.store.dispatch(
          new UpdateState({
            stateVar: "LTG",
            newVal: user
          })
        );
      });

    this.submitQuarterGoals$
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.currentUser$)
      )
      .subscribe(([goals, user]) => {
        if (user.setupInProgress.type == "initial") {
          let currGoal: QuarterGoal;
          goals.forEach(goal => {
            currGoal = {
              __id: (Math.random() * 1000).toString(),
              __userId: user.__id,
              _createdAt: firestore.Timestamp.now(),
              text: goal.text,
              completed: false
            };
            this.store.dispatch(
              new UpdateState({
                stateVar: "Initial Quarter Goals",
                newVal: currGoal
              })
            );
          });
        }
        if (user.setupInProgress.type == "quarter") {
          goals.forEach(goal => {
            this.store.dispatch(
              new UpdateState({
                stateVar: "Quarter Goals",
                newVal: goal
              })
            );
          });
        }
      });

      this.submitWeekGoals$
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.currentUser$)
      )
      .subscribe(([goals, user]) => {
        if (user.setupInProgress.type == "initial") {
          let currGoal: WeekGoal;
          let counter = -1;
          goals.forEach(goal => {
            currGoal = {
              __id: (Math.random() * 1000).toString(),
              __userId: user.__id,
              _createdAt: firestore.Timestamp.now(),
              text: goal.text,
              completed: false,
              index: ++counter,
              hashtag: ""
            };
            this.store.dispatch(
              new UpdateState({
                stateVar: "Initial Week Goals",
                newVal: currGoal
              })
            );
          });
        }

        if (user.setupInProgress.type == "week") {
          let currGoal: WeekGoal;
          let counter = -1;
          goals.forEach(goal => {
            currGoal = {
              __id: (Math.random() * 1000).toString(),
              __userId: user.__id,
              _createdAt: firestore.Timestamp.now(),
              text: goal.text,
              completed: false,
              index: ++counter,
              hashtag: ""
            };
            this.store.dispatch(
              new UpdateState({
                stateVar: "Week Goals",
                newVal: currGoal
              })
            );
          });
        }
      });

      this.changedWeekGoalsHashtag$
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.currentUser$)
      )
      .subscribe(([goals, user]) => {
          goals.forEach(goal => {
            this.store.dispatch(
              new UpdateState({
                stateVar: "Week Hashtag",
                newVal: goal
              })
            );
          });
        }
      );

      this.checkWeekGoals$.pipe(takeUntil(this.unsubscribe$), withLatestFrom(this.weekGoals$)).subscribe(([newGoals, oldGoals]) => {
        //for each of the new goals, for each of the old goals
        // if the id's are the same and the userIds are the same, then if the completed status is changed, 
        // update state of newGoals
        newGoals.forEach(newGoal =>{
          oldGoals.forEach(oldGoal => {
            if((newGoal.__id === oldGoal.__id) && (newGoal.__userId === oldGoal.__userId)) {
              console.log("going in loop")
              console.log(oldGoal)
                console.log(newGoal)
              if(newGoal.completed != oldGoal.completed) {
                console.log("changed new goal")
                console.log(oldGoal)
                console.log(newGoal)
              }
            }
          })
        })
        // for(let i = 0; i < newGoals.length; i++){
        //   for(let j = 0; j < oldGoals.length; j++){
        //   if(newGoals[i].__id == oldGoals[j].__id){
        //     if(newGoals[i].completed != oldGoals[j].completed){
              
        //       this.store.dispatch(
        //         new UpdateState({
        //           stateVar: "Complete Week",
        //           newVal: newGoals[i]
        //         })
        //       )
        //     }
        //   }
        // }
     // }
    });

      this.checkQuarterGoals$.pipe(takeUntil(this.unsubscribe$), withLatestFrom(this.quarterGoals$)).subscribe(([newGoals, oldGoals]) => {
        for(let i = 0; i < newGoals.length; i++){
              this.store.dispatch(
                new UpdateState({
                  stateVar: "Complete Quarter",
                  newVal: newGoals[i]
                })
              )
            }
          }
      //  }
  //}
      )
}

  
  /** Returns the path type that the user is on */
  getUserPathType() {
    let type;
    this.currentUser$.subscribe(user => {
      if (user.setupInProgress) {
        type = user.setupInProgress.type;
      }
    });
    return type;
  }

  /**  Returns an object that represents the order of the slides for that path */
  getPathOrder(userType): {} {
    let pathOrder: {};
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
        slideOrder: ["Review", "Weekly Goals", "Organized", "Schedule"],
        progressBar: ["Review", "Weekly Goals", "Organize", "Schedule"]
      },
      {
        type: "quarter",
        slideOrder: [
          "Review",
          "Quarter Goals",
          "Weekly Goals",
          "Organized",
          "Schedule"
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
      if (userType === path.type) {
        pathOrder = path;
      }
    });
    return pathOrder;
  }

  /**  Returns the current slide */
  getCurrentSlide() {
    let currSlide: string;
    this.currPathType$.subscribe(path => {
      currSlide = path["slideOrder"][this.slideIndex$.getValue()];
    });
    return currSlide;
  }

  /**  Goes to the next slide */
  nextSlide() {
    let currValue = this.slideIndex$.getValue() + 1;
    this.currentUser$.subscribe(user => {
      user.setupInProgress.currentStep = currValue;
    });
    this.slideIndex$.next(currValue);
  }

  /**  Goes back a slide */
  prevSlide() {
    let currValue = this.slideIndex$.getValue() - 1;
      this.currentUser$.subscribe(user => {
        user.setupInProgress.currentStep = currValue;
      });
      this.slideIndex$.next(currValue);
  }

  /**  Returns the title array for the progress bar */
  getProgressBar() {
    let progressArray: Array<string>;
    this.currPathType$.subscribe(path => {
      progressArray = path["progressBar"];
    });
    return progressArray;
  }

  /**  Determines what title should display on the text slide */
  assembleTitle() {
    let index: number;
    let title: string;
    let username;
    this.currentUser$.subscribe(u => (username = u.name));
    this.slideIndex$.subscribe(i => (index = i));

    switch (index) {
      case 0:
        title = "Welcome, " + username;
        break;
      case 2:
        title = "Nice work.";
        break;
      case 4:
        title = "One step at a time.";
        break;
      case 6:
        title = "Let's get organized.";
        break;
    }
    return title;
  }

  /**  Determines what description should display on the text slide */
  assembleDesc() {
    let index: number;
    let desc: string;
    this.slideIndex$.subscribe(i => (index = i));

    switch (index) {
      case 0:
        desc = "Compass helps you set goals and reach them. Let's get started.";
        break;
      case 2:
        desc = "What can you do this quarter to reach your long term goals?";
        break;
      case 4:
        desc = "Weekly planning will keep you on track to achieve your goals.";
        break;
      case 6:
        desc = "We categorize your weekly goals with hashtags.";
        break;
    }
    return desc;
  }

  getUserId(){
    let userId: string;
    this.currentUser$.pipe().subscribe(user => {
      userId = user.__id;
    })
    return userId
  }

  ngOnInit() {
    // Once everything is set up, load the data for the role.
    this.currentUser$
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.startOfWeek$)
      )
      .subscribe(([user, startOfWeek]) => {
        this.store.dispatch(
          new LoadData({
            currentUser: user,
            startOfWeek: startOfWeek
          })
        );
      });
    this.currentUser$.subscribe(console.log);
    // Initialize Slide Index
    this.currentUser$.subscribe(user => {
      this.slideIndex$ = new BehaviorSubject<number>(
        user.setupInProgress.currentStep
      );
    });
    this.currPathType$ = new BehaviorSubject<Object>(
      this.getPathOrder(this.getUserPathType())
    );
    this.mdb.mockDB.weekGoals.subscribe(console.log);
    this.mdb.mockDB.quarterGoals.subscribe(console.log);
    //SOMETHING GETs messed up when we try to push to the database in review somehow
    //console.log(this.getUserId())
  }


  ngOnDestroy() {
    // Unsubscribe subscriptions.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    // Unsubscribe from firebase connection from load and free up memoized selector values.
    this.store.dispatch(new Cleanup());
    this.selectors.cleanup();
  }
}
