import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/store/app.reducer';
import * as fromAuth from '../../core/store/auth/auth.reducer';
import { FirebaseService } from '../../core/firebase/firebase.service';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { withLatestFrom, take, takeUntil } from 'rxjs/operators';

import { NavbarState } from './+state/navbar.state';
import { NavbarSelectors } from './+state/navbar.state.selectors';

import { LoadData, Cleanup } from './+state/navbar.state.actions';
import { RouterNavigate } from '../../core/store/app.actions';

import { User } from '../../core/store/user/user.model';

/** Compass navbar. */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {

  // --------------- ROUTE PARAMS & CURRENT USER ---------
 
  
  // --------------- DB ENTITY DATA ----------------------


  // --------------- LOCAL UI STATE ----------------------
 

  // --------------- DATA BINDING STREAMS ----------------


  // --------------- EVENT BINDING STREAMS ---------------


  // --------------- OTHER -------------------------------

  /** Unsubscribe observable for subscriptions. */
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private state: NavbarState,
    private route: ActivatedRoute, 
    private selectors: NavbarSelectors,
    private store: Store<fromStore.State>,
    private db: FirebaseService,
  ) { 

    // --------------- EVENT HANDLING ----------------------
  
  }

  ngOnInit() {

    // Once everything is set up, load the data for the role.
    this.store.dispatch( new LoadData() );
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