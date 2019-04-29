import { NgModule, Optional, SkipSelf, NgZone, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { throwIfAlreadyLoaded } from './setup/module-import-guard';

import { environment } from '../../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MainAngularFirestore, LoggingAngularFirestore, MainAngularFirestoreFactory, LoggingAngularFirestoreFactory } from './setup/firebase-setup';

// NgRx
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';

// Auth
import { AuthEffects } from './store/auth/auth.effects';

// Entity Effects
import { CalendarEventEffects } from './store/calendar-event/calendar-event.effects';
import { WeekGoalEffects } from './store/week-goal/week-goal.effects';
import { QuarterGoalEffects } from './store/quarter-goal/quarter-goal.effects';
import { UserEffects } from './store/user/user.effects';

// Service Effects

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      AppEffects, 
      AuthEffects, 
      // Service Effects
      // Entity Effects
      CalendarEventEffects,
      WeekGoalEffects,
      QuarterGoalEffects,
      UserEffects,
    ])
  ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    environment.production || !environment.mockDataInDev ? { provide: MainAngularFirestore, deps: [PLATFORM_ID, NgZone], useFactory: MainAngularFirestoreFactory } : [],
    environment.production ? { provide: LoggingAngularFirestore, deps: [PLATFORM_ID, NgZone], useFactory: LoggingAngularFirestoreFactory } : [],
    { provide: FirestoreSettingsToken, useValue: {} }
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
