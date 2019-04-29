import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../../core/store/app.reducer';
import * as fromAuth from '../../core/store/auth/auth.reducer';
import { Login, Logout } from '../../core/store/auth/auth.actions';
import { User } from '../../core/store/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  // --------------- ROUTE PARAMS & CURRENT USER ---------

   /** The currently signed in user. */
  currentUser$: Observable<User> = this.store.pipe(select(fromAuth.selectUser));

  // --------------- LOCAL UI STATE ----------------------


  // --------------- DATA BINDING STREAMS ----------------


  // --------------- EVENT BINDING STREAMS: RAW ------

  /** Login click events. */
  login$: Subject<void> = new Subject<void>();

  /** Logout click events. */
  logout$: Subject<void> = new Subject<void>();

  // --------------- EVENT BINDING STREAMS: COMPUTED -----


  // --------------- OTHER -------------------------------

  /** Unsubscribe observable for subscriptions. */
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromStore.State>,
  ) {
    // --------------- EVENT HANDLING ----------------------

    /** Handle login events. */
    this.login$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.store.dispatch(new Login({ provider: 'google.com' }));
    });
    
    /** Handle logout events. */
    this.logout$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.store.dispatch(new Logout());
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Unsubscribe subscriptions.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}